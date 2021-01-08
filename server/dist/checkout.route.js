"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const database_1 = require("./database");
const firestore_1 = require("@google-cloud/firestore");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function createCheckoutSession(req, res) {
    try {
        const info = {
            pricingPlanId: req.body.pricingPlanId,
            callbackUrl: req.body.callbackUrl,
            userId: req['uid']
        };
        if (!info.userId) {
            const message = 'User must be authenticated';
            res.status(403).json({ message });
            return;
        }
        const checkoutSessionData = {
            status: 'ongoing',
            created: firestore_1.Timestamp.now(),
            pricingPlanId: '',
        };
        checkoutSessionData.pricingPlanId = info.pricingPlanId;
        const user = await database_1.getDocData(`users/${info.userId}`);
        const userRef = database_1.db.doc(`users/${info.userId}`);
        await userRef.set(checkoutSessionData, { merge: true });
        let sessionConfig, stripeCustomerId = user ? user.stripeCustomerId : undefined;
        if (info.pricingPlanId) {
            sessionConfig = setupSubscriptionSession(info, info.userId, stripeCustomerId, info.pricingPlanId);
        }
        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.status(200).json({
            stripeCheckoutSessionId: session.id,
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY
        });
    }
    catch (error) {
        console.log("Unespected error while purchasing ", error);
        res.status(500).json({ error: "Could not intiate Stripe CHKO Session" });
    }
}
exports.createCheckoutSession = createCheckoutSession;
function setupSubscriptionSession(info, sessionId, stripeCustomerId, pricingPlanId) {
    const config = setupBaseSessionConfig(info, sessionId, stripeCustomerId);
    config.subscription_data = {
        items: [{ plan: pricingPlanId }]
    };
    return config;
}
function setupBaseSessionConfig(info, sessionId, stripeCustomerId) {
    const config = {
        payment_method_types: ['card'],
        success_url: `${info.callbackUrl}/?purchaseResult=success&ongoingPurchaseSessionId=${sessionId}`,
        cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
        client_reference_id: sessionId
    };
    if (stripeCustomerId) {
        config.customer = stripeCustomerId;
    }
    return config;
}
//# sourceMappingURL=checkout.route.js.map