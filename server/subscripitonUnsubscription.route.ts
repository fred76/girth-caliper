import { Request, Response } from "express"
import { db } from "./database";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
  callbackUrl: string,
  userId: string,
  cancelAtPeriodEnd: boolean,
  subscriptionId: string,
  isDeleteSubscription: boolean,
  deleteSubscription: boolean,
}

export async function subscripitonUnsubscription(req: Request, res: Response) {
  try {
    const info: RequestInfo = {
      cancelAtPeriodEnd: req.body.cancelAtPeriodEnd,
      callbackUrl: req.body.callbackUrl,
      userId: req['uid'],
      subscriptionId: req.body.subscriptionId,
      isDeleteSubscription: req.body.isDeleteSubscription,
      deleteSubscription: req.body.deleteSubscription,
    }


    if (!info.userId) {
      const message = 'User must be authenticated'
      res.status(403).json({ message })
      return
    }

    if (!info.isDeleteSubscription) {
      const unsuscribeData: any = {
        cancel_at_period_end: false
      }
      unsuscribeData.cancel_at_period_end = info.cancelAtPeriodEnd

      const userRef = db.doc(`users/${info.userId}`);

      await userRef.set(unsuscribeData, { merge: true })

      const subscription = await stripe.subscriptions.update(
        info.subscriptionId,
        { cancel_at_period_end: info.cancelAtPeriodEnd }
      );
    } else {
      const deleted = await stripe.subscriptions.del(
        info.subscriptionId,
      );
      if (deleted) {
        const userRef = db.doc(`users/${info.userId}`);
        await userRef.set({ status: "cancelled" }, { merge: true })
      }

    }

    const subscriptions = await stripe.subscriptions.list({
      status: "all"
    });
    res.status(200)

  }

  catch (error) {
    console.log("Unespected error while purchasing ", error);
    res.status(500).json({ error: "Could not intiate Stripe CHKO Session" })
  }

}

