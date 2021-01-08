"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhooks = void 0;
const database_1 = require("./database");
const database_2 = require("./database");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function stripeWebhooks(req, res) {
    try {
        const signature = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        if (event.type == "checkout.session.completed") {
            const session = event.data.object;
            const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
            await onSubscriptionRetreived_created(subscription, session.client_reference_id);
            await onCheckoutSessionCompleted(session);
        }
        if (event.type == "invoice.paid") {
            const session = event.data.object;
            if (session.billing_reason == "subscription_cycle") {
                console.log("PPAPAPPAP");
                const subscription = await stripe.subscriptions.retrieve("sub_IilsbL0tTQZyiM");
                console.log("subscription");
                console.log(subscription);
                await onSubscriptionRetreived_Updated(subscription);
            }
        }
        if (event.type == "invoice.payment_failed") {
            const session = event.data.object;
            await invocePaymentFailureForUser(session.customer, session.created, session.id);
        }
        res.json({
            received: true
        });
    }
    catch (error) {
        console.log("Error processing webhooks event, reason  ", error);
        return res.status(400).send(`Webhook Error: ${error.message} `);
    }
}
exports.stripeWebhooks = stripeWebhooks;
async function onSubscriptionRetreived_created(session, id) {
    const subscriptionId = session.id;
    const cancel_at_period_end = session.cancel_at_period_end;
    const current_period_end = new Date(session.current_period_end * 1000);
    const current_period_start = new Date(session.current_period_start * 1000);
    const pricingPlanId = session.plan.id;
    await fulfillSubscriptionData_created(id, subscriptionId, cancel_at_period_end, current_period_end, current_period_start, pricingPlanId);
}
async function fulfillSubscriptionData_created(userId, subscriptionId, cancel_at_period_end, current_period_end, current_period_start, pricingPlanId) {
    const batch = database_1.db.batch();
    const stripeCustomers = await database_1.db.doc(`users/${userId}`);
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
    const userId = session.client_reference_id;
    const { pricingPlanId } = await database_2.getDocData(`users/${userId}`);
    if (pricingPlanId) {
        await fulfillSubscriptionPurchase_FS_User(userId, session.customer, pricingPlanId);
    }
}
async function fulfillSubscriptionPurchase_FS_User(userId, stripeCustomerId, pricingPlanId) {
    const batch = database_1.db.batch();
    const userRef = database_1.db.doc(`users/${userId}`);
    batch.update(userRef, { status: "completed" });
    const userRef2 = database_1.db.doc(`users/${userId}`);
    batch.set(userRef2, { stripeCustomerId: stripeCustomerId }, { merge: true });
    return batch.commit();
}
async function onSubscriptionRetreived_Updated(subscription) {
    const subscriptionId = subscription.id;
    const current_period_end = new Date(subscription.current_period_end * 1000);
    const current_period_start = new Date(subscription.current_period_start * 1000);
    const stripeCustomerId = subscription.customer;
    const pricingPlanId = subscription.plan.id;
    await fulfillSubscriptionData_Update(subscriptionId, current_period_end, current_period_start, stripeCustomerId, pricingPlanId);
}
async function fulfillSubscriptionData_Update(subscriptionId, current_period_end, current_period_start, stripeCustomerId, pricingPlanId) {
    const batch = database_1.db.batch();
    const query = await database_1.db.collection('users').where('stripeCustomerId', '==', stripeCustomerId).get();
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
    const batch = database_1.db.batch();
    const query = await database_1.db.collection('users').where('stripeCustomerId', '==', customerId).get();
    if (!query.empty) {
        const snapshot = query.docs[0];
        batch.set(snapshot.ref, {
            invoiceIdFailed: invoiceId,
            invoiceDateFailed: new Date(invoiceDate * 1000),
            invoiceStatus: "payment_failed",
        }, { merge: true });
        return batch.commit();
    }
}
//# sourceMappingURL=stripe-webhooks.route.js.map