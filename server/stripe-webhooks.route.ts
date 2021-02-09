
import { Response, Request } from 'express';
import { db } from "./database";
import { getDocData, } from './database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function stripeWebhooks(req: Request, res: Response) {

  try {

    console.log(" p p p p pp D D D D  D D D D D D D ");


    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)

    // if (event.type == "application_fee.created") {
    //   console.log("application_fee.created");
    //   console.log(event.type);
    // }

    if (event.type == "checkout.session.completed") {
      console.log("checkout.session.completed");

      const session = event.data.object
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.subscription
      );
      await onSubscriptionRetreived_created(subscription, session.client_reference_id)

    }

    if (event.type == "invoice.paid") {
      const session = event.data.object

      //  if (session.billing_reason == "subscription_create") {
      if (session.billing_reason == "subscription_cycle") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        )
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
  const stripeCustomerId = session.customer
  await fulfillSubscriptionData_created(stripeCustomerId, id, subscriptionId, cancel_at_period_end, current_period_end, current_period_start, pricingPlanId)
}

async function fulfillSubscriptionData_created(
  stripeCustomerId: string,
  userId: string,
  subscriptionId: string,
  cancel_at_period_end: boolean,
  current_period_end: Date,
  current_period_start: Date,
  pricingPlanId: string,
) {
  const batch = db.batch();
  const stripeCustomers = await db.doc(`users/${userId}`);

  const stripeInfoGC = {
    stripeInfoGC: {
      subscriptionId: subscriptionId,
      stripeCustomerId: stripeCustomerId,
      cancel_at_period_end: cancel_at_period_end,
      current_period_end: current_period_end,
      current_period_start: current_period_start,
      pricingPlanId: pricingPlanId,
      status: "completed"
    }
  }
  console.log(stripeInfoGC);

  batch.set(stripeCustomers, stripeInfoGC, { merge: true });
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
  const query = await db.collection('users').where('stripeInfoGC.stripeCustomerId', '==', stripeCustomerId).get().then(p => {

    return p
  })
  console.log("query");
  console.log(query);


  if (!query.empty) {
    const snap = query.docs[0].data();
    console.log("snap");
    console.log(snap);

    const stripeInfoGC = {
      stripeInfoGC: {
        subscriptionId: subscriptionId,
        stripeCustomerId: snap.stripeInfoGC.stripeCustomerId,
        cancel_at_period_end: snap.stripeInfoGC.cancel_at_period_end,
        current_period_end: current_period_end,
        current_period_start: current_period_start,
        pricingPlanId: pricingPlanId,
        status: "completed",
        invoiceIdFailed: "",
        invoiceDateFailed: "",
        invoiceStatus: "",
      }
    }
    console.log("stripeInfoGC");
    console.log(stripeInfoGC);
    batch.set(query.docs[0].ref, stripeInfoGC, { merge: true })
    return batch.commit();
  }

}

async function invocePaymentFailureForUser(customerId, invoiceDate, invoiceId) {
  const batch = db.batch();
  const query = await db.collection('users').where('stripeInfoGC.stripeCustomerId', '==', 'cus_Ise6KcCOpzKsxr').get().then(p => {
    return p
  })

  if (!query.empty) {

    const snap = query.docs[0].data();

    const stripeInfoGC = {
      stripeInfoGC: {
        subscriptionId: snap.stripeInfoGC.subscriptionId,
        stripeCustomerId: snap.stripeInfoGC.stripeCustomerId,
        cancel_at_period_end: snap.stripeInfoGC.cancel_at_period_end,
        current_period_end: new Date(snap.stripeInfoGC.current_period_end.seconds * 1000),
        current_period_start: new Date(snap.stripeInfoGC.current_period_start.seconds * 1000),
        pricingPlanId: snap.stripeInfoGC.pricingPlanId,
        status: "completed",
        invoiceIdFailed: invoiceId,
        invoiceDateFailed: new Date(invoiceDate * 1000),
        invoiceStatus: "payment_failed",
      }
    }
    batch.set(query.docs[0].ref, stripeInfoGC, { merge: true })
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
