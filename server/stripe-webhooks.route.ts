import { Response, Request } from 'express';
import { db } from "./database";
import { getDocData, } from './database';

const stripe = require('stripe')(process.env.STRIPE_WEBHOOK_SECRET)

export async function stripeWebhooks(req: Request, res: Response) {

  try {
    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)

      console.log("EVENT INIZIO");
      console.log(event);
      console.log("EVENT FINE");


    if (event.type == "checkout.session.completed") {

      const session = event.data.object
      await onCheckoutSessionCompleted(session)
    }

    res.json({
      received: true
    })

  } catch (error) {
    console.log("Error processing webhooks event, reason  ", error);
    return res.status(400).send(`Webhook Error: ${error.message} `)
  }
}

//  case 'invoice.created':sess2.period_end

async function onCheckoutSessionCompleted(session) {
  const purchasedSessionId = session.client_reference_id
  const { pricingPlanId } = await getDocData(`users/${purchasedSessionId}`)

  if (pricingPlanId) {
    await fulfillSubscriptionPurchase(purchasedSessionId,
      session.customer, pricingPlanId);
  }
}

async function fulfillSubscriptionPurchase(purchasedSessionId: string,
  stripeCustomerId: string, pricingPlanId: string) {
  const batch = db.batch();
  const userRef = db.doc(`users/${purchasedSessionId}`);
  batch.update(userRef, { status: "completed" });
  const userRef2 = db.doc(`users/${purchasedSessionId}`);
  batch.set(userRef2, { pricingPlanId, stripeCustomerId }, { merge: true });
  return batch.commit();
}
