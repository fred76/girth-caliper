import { Request, Response } from "express"
import { db } from "./database";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
  userId: string,
  cancelAtPeriodEnd: boolean,
  subscriptionId: string,
  isDeleteSubscription: boolean,
  deleteSubscription: boolean,
  stripeInfoGC
}

export async function subscripitonUnsubscription(req: Request, res: Response) {
  try {
    const info: RequestInfo = {
      cancelAtPeriodEnd: req.body.cancelAtPeriodEnd,
      userId: req['uid'],
      subscriptionId: req.body.subscriptionId,
      isDeleteSubscription: req.body.isDeleteSubscription,
      deleteSubscription: req.body.deleteSubscription,
      stripeInfoGC: req.body.stripeInfoGC
    }


    if (!info.userId) {
      const message = 'User must be authenticated'
      res.status(403).json({ message })
      return
    }

    if (!info.isDeleteSubscription) {

      info.stripeInfoGC.created = new Date(info.stripeInfoGC.created.seconds * 1000)
      info.stripeInfoGC.current_period_end = new Date(info.stripeInfoGC.current_period_end.seconds * 1000)
      info.stripeInfoGC.current_period_start = new Date(info.stripeInfoGC.current_period_start.seconds * 1000)
      info.stripeInfoGC.cancel_at_period_end = info.cancelAtPeriodEnd
      const userRef = db.doc(`users/${info.userId}`);

      await userRef.set({ stripeInfoGC:  info.stripeInfoGC}, { merge: true })

      const subscription = await stripe.subscriptions.update(
        info.subscriptionId,
        { cancel_at_period_end: info.cancelAtPeriodEnd }
      );
    } else {
      const deleted = await stripe.subscriptions.del(
        info.subscriptionId,
      );
      if (deleted) {
      info.stripeInfoGC.created = new Date(info.stripeInfoGC.created.seconds * 1000)
      info.stripeInfoGC.current_period_end = new Date(info.stripeInfoGC.current_period_end.seconds * 1000)
      info.stripeInfoGC.current_period_start = new Date(info.stripeInfoGC.current_period_start.seconds * 1000)
      info.stripeInfoGC.cancel_at_period_end = true
      info.stripeInfoGC.status = "cancelled"
      info.stripeInfoGC.subscriptionId = "cancelled"
        const userRef = db.doc(`users/${info.userId}`);
        await userRef.set({ stripeInfoGC:  info.stripeInfoGC}, { merge: true })
      }

    }


    res.status(200)

  }

  catch (error) {
    console.log("Unespected error while purchasing ", error);
    res.status(500).json({ error: "Could not intiate Stripe CHKO Session" })
  }

}

