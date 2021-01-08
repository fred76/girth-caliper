
import { Response, Request } from 'express';
import { db } from "./database";
import { getDocData, } from './database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function stripeWebhooks(req: Request, res: Response) {

  try {
    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)

    if (event.type == "checkout.session.completed") {
      const session = event.data.object
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.subscription
      );
      await onSubscriptionRetreived_created(subscription, session.client_reference_id)
      await onCheckoutSessionCompleted(session)
    }

    if (event.type == "invoice.paid") {
      const session = event.data.object
      // if (session.billing_reason == "subscription_create") {
      if (session.billing_reason == "subscription_cycle") {
        console.log("PPAPAPPAP");

        const subscription = await stripe.subscriptions.retrieve(
          "sub_IilsbL0tTQZyiM"
          //  session.subscription
        )
        console.log("subscription");
        console.log(subscription);

        await onSubscriptionRetreived_Updated(subscription)
      }
    }

    if (event.type == "invoice.payment_failed") {
      const session = event.data.object
      await invocePaymentFailureForUser(session.customer, session.created, session.id)
    }

    res.json({
      received: true
    })

  } catch (error) {
    console.log("Error processing webhooks event, reason  ", error);
    return res.status(400).send(`Webhook Error: ${error.message} `)
  }
}

async function onSubscriptionRetreived_created(session, id) {
  const subscriptionId = session.id
  const cancel_at_period_end = session.cancel_at_period_end
  const current_period_end = new Date(session.current_period_end * 1000)
  const current_period_start = new Date(session.current_period_start * 1000)
  const pricingPlanId = session.plan.id
  await fulfillSubscriptionData_created(id, subscriptionId, cancel_at_period_end, current_period_end, current_period_start, pricingPlanId)
}

async function fulfillSubscriptionData_created(
  userId: string,
  subscriptionId: string,
  cancel_at_period_end: boolean,
  current_period_end: Date,
  current_period_start: Date,
  pricingPlanId: string) {
  const batch = db.batch();
  const stripeCustomers = await db.doc(`users/${userId}`);

  batch.set(stripeCustomers, {
    subscriptionId: subscriptionId,
    cancel_at_period_end: cancel_at_period_end,
    current_period_end: current_period_end,
    current_period_start: current_period_start,
    pricingPlanId: pricingPlanId
  }, { merge: true });
  return batch.commit();


}

async function onCheckoutSessionCompleted(session) {
  const userId = session.client_reference_id
  const { pricingPlanId } = await getDocData(`users/${userId}`)
  if (pricingPlanId) {
    await fulfillSubscriptionPurchase_FS_User(userId, session.customer, pricingPlanId)
  }
}

async function fulfillSubscriptionPurchase_FS_User(userId: string, stripeCustomerId: string, pricingPlanId: string) {
  const batch = db.batch();
  const userRef = db.doc(`users/${userId}`);
  batch.update(userRef, { status: "completed" });
  const userRef2 = db.doc(`users/${userId}`);
  batch.set(userRef2, { stripeCustomerId: stripeCustomerId }, { merge: true });
  return batch.commit();
}

async function onSubscriptionRetreived_Updated(subscription) {
  const subscriptionId = subscription.id
  const current_period_end = new Date(subscription.current_period_end * 1000)
  const current_period_start = new Date(subscription.current_period_start * 1000)
  const stripeCustomerId = subscription.customer
  const pricingPlanId = subscription.plan.id
  await fulfillSubscriptionData_Update(subscriptionId, current_period_end, current_period_start, stripeCustomerId, pricingPlanId)
}

async function fulfillSubscriptionData_Update(
  subscriptionId: string,
  current_period_end: Date,
  current_period_start: Date,
  stripeCustomerId: string,
  pricingPlanId: string) {

  const batch = db.batch();
  const query = await db.collection('users').where('stripeCustomerId', '==', stripeCustomerId).get()

  if (!query.empty) {
    const snapshot = query.docs[0];
    const data = snapshot.data();
    console.log(data.cancel_at_period_end);

    batch.set(snapshot.ref, {
      subscriptionId: subscriptionId,
      cancel_at_period_end: data.cancel_at_period_end,
      current_period_end: current_period_end,
      current_period_start: current_period_start,
      pricingPlanId: pricingPlanId
    }, { merge: true });
    return batch.commit();
  }

}

async function invocePaymentFailureForUser(customerId, invoiceDate, invoiceId) {
  const batch = db.batch();
  const query = await db.collection('users').where('stripeCustomerId', '==', customerId).get()
  if (!query.empty) {
    const snapshot = query.docs[0];
    batch.set(snapshot.ref, {
      invoiceIdFailed: invoiceId,
      invoiceDateFailed: new Date(invoiceDate * 1000),
      invoiceStatus: "payment_failed",
    }, { merge: true })
    return batch.commit();
  }

}

/*
charge.succeeded sub_Ii6LZ5K45xagEb
checkout.session.completed Id: sub_Igf8dohjd5f6E0
invoice.created
customer.subscription.created Id: sub_Igf8dohjd5f6E0
customer.subscription.updated
payment_method.attached
invoice.updated
invoice.finalized Id: sub_Igf8dohjd5f6E0 , customer: 'cus_IgewllZD4wTelw', hosted_invoice_url , period_end: 1609623545, period_start: 1609623545,
invoice.paid
invoice.payment_succeeded
payment_intent.created
payment_intent.succeeded
invoice.updated

// actual subscription: 'sub_Igr77ps7R87T5C',
*/
//stripe trigger invoice.payment_succeeded
