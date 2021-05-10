import { async } from '@angular/core/testing';
import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { db, getDocData } from './database';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
  callbackUrl: string,
  userId: string,
  athleteAdmission: string
}
export async function trainerCreateStripeAccount(req: Request, res: Response) {
  const info: RequestInfo = {
    callbackUrl: req.body.callbackUrl,
    userId: req['uid'],
    athleteAdmission: req.body.athleteAdmission
  }
  const account = await stripe.accounts.create({ type: "standard" });
  const userRef = db.doc(`users/${info.userId}`);
  console.log("info.athleteAdmission");
  console.log(info.athleteAdmission);
  console.log("info.athleteAdmission");

  await userRef.set({profile: { trainerStripeConnected: account.id,  athleteAdmission: info.athleteAdmission}}, { merge: true })
  const sessionConfig = await stripeAccountLinksCreate(info, account.id, info.userId)
  await stripe.accountLinks.create(sessionConfig).
    then((link) => {
      link.url
      res.status(200).json({
        url: link.url
      })
    })
}

interface RequestInfoUpdate {
  callbackUrl: string,
  userId: string,
  stripeAccountTrainer: string
}

export async function trainerUdateStripeAccount(req: Request, res: Response) {
  const info: RequestInfoUpdate = {
    stripeAccountTrainer: req.body.stripeAccountTrainer,
    callbackUrl: req.body.callbackUrl,
    userId: req['uid']
  }

  const sessionConfig = await stripeAccountLinksCreate(info, info.stripeAccountTrainer, info.userId)
  await stripe.accountLinks.create(sessionConfig).
    then((link) => {
      link.url
      res.status(200).json({
        url: link.url
      })
    })
}



function stripeAccountLinksCreate(info, accountID: string, sessionId: string) {

  const config: any = {
    type: "account_onboarding",
    account: accountID,
    refresh_url: `${info.callbackUrl}/?purchaseResult=failed&ongoingTrainerSessionId`,
    return_url: `${info.callbackUrl}/?purchaseResult=accountSuccess&ongoingPurchaseSessionId=${sessionId}`,

  }
  return config;
}



export async function trainerRetreiveStripeAccount(req: Request, res: Response) {
  console.log(req.body.stripeAccountTrainer);
  if (req.body.stripeAccountTrainer) {
    const account = await stripe.accounts.retrieve(req.body.stripeAccountTrainer)

    res.status(200).json({
      account
    })
  }



}
