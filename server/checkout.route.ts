import { Request, Response } from "express"
import { db, getDocData } from "./database";
import { Timestamp } from '@google-cloud/firestore'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
  callbackUrl: string,
  userId: string,
  pricingPlanId: String
}

export async function createCheckoutSession(req: Request, res: Response) {

  try {

    const info: RequestInfo = {
      pricingPlanId: req.body.pricingPlanId,
      callbackUrl: req.body.callbackUrl,
      userId: req['uid'],
    }


    if (!info.userId) {
      const message = 'User must be authenticated'
      res.status(403).json({ message })
      return
    }


    const checkoutSessionData: any = {
      status: 'ongoing',
      created: Timestamp.now(),
      pricingPlanId: ''
    }

    checkoutSessionData.pricingPlanId = info.pricingPlanId


    const user = await getDocData(`users/${info.userId}`)

    const userRef = db.doc(`users/${info.userId}`);

    await userRef.set({stripeInfoGC : checkoutSessionData }, { merge: true })
    await userRef.set({userCategory : req.body.userCategory }, { merge: true })

    let sessionConfig, stripeCustomerId = user ? user.stripeCustomerId : undefined;

    if (info.pricingPlanId) {
      sessionConfig = setupSubscriptionSession(info, info.userId, stripeCustomerId, info.pricingPlanId)
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);



    res.status(200).json({
      stripeCheckoutSessionId: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY
    })
  }

  catch (error) {
    console.log("Unespected error while purchasing ", error);
    res.status(500).json({ error: "Could not intiate Stripe CHKO Session" })
  }

}

function setupSubscriptionSession(info: RequestInfo, sessionId: string, stripeCustomerId, pricingPlanId) {

  const config = setupBaseSessionConfig(info, sessionId, stripeCustomerId);

  config.subscription_data = {
    items: [{ plan: pricingPlanId }]
  };

  return config;
}

function setupBaseSessionConfig(info: RequestInfo, sessionId: string, stripeCustomerId: string) {
  const config: any = {
    payment_method_types: ['card'],
    success_url: `${info.callbackUrl}/?purchaseResult=success&ongoingPurchaseSessionId=${sessionId}`,
    cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
    client_reference_id: sessionId
  }

  if (stripeCustomerId) {
    config.customer = stripeCustomerId
  }

  return config
}
