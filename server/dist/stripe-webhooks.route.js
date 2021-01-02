"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhooks = void 0;
const database_1 = require("./database");
const database_2 = require("./database");
const stripe = require('stripe')(process.env.STRIPE_WEBHOOK_SECRET);
async function stripeWebhooks(req, res) {
    try {
        const signature = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("EVENT INIZIO");
        console.log(event);
        console.log("EVENT FINE");
        if (event.type == "checkout.session.completed") {
            const session = event.data.object;
            await onCheckoutSessionCompleted(session);
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
async function onCheckoutSessionCompleted(session) {
    const purchasedSessionId = session.client_reference_id;
    const { pricingPlanId } = await database_2.getDocData(`users/${purchasedSessionId}`);
    if (pricingPlanId) {
        await fulfillSubscriptionPurchase(purchasedSessionId, session.customer, pricingPlanId);
    }
}
async function fulfillSubscriptionPurchase(purchasedSessionId, stripeCustomerId, pricingPlanId) {
    const batch = database_1.db.batch();
    const userRef = database_1.db.doc(`users/${purchasedSessionId}`);
    batch.update(userRef, { status: "completed" });
    const userRef2 = database_1.db.doc(`users/${purchasedSessionId}`);
    batch.set(userRef2, { pricingPlanId, stripeCustomerId }, { merge: true });
    return batch.commit();
}
//# sourceMappingURL=stripe-webhooks.route.js.map