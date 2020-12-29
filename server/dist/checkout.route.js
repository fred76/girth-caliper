"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const database_1 = require("./database");
const firestore_1 = require("@google-cloud/firestore");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function createCheckoutSession(req, res) {
    try {
        const info = {
            courseId: req.body.courseID,
            callbackUrl: req.body.callbackUrl,
            userId: req['uid']
        };
        if (!info.courseId) {
            const message = 'User must be authenticated';
            console.log(message);
            res.status(403).json({ message });
            return;
        }
        console.log("Purchasing course id: ", info);
        const purchaseSession = await database_1.db.collection("purchaseSession").doc();
        const checkoutSessionData = {
            status: 'ongoing',
            created: firestore_1.Timestamp.now(),
            userId: info.userId
        };
        if (info.courseId) {
            checkoutSessionData.courseId = info.courseId;
        }
        await purchaseSession.set(checkoutSessionData);
        console.log(checkoutSessionData);
        let sessionConfig;
        if (info.courseId) {
            sessionConfig = setupPurchaseCourseSession(info, purchaseSession.id);
        }
        console.log(sessionConfig);
        const session = await stripe.checkout.sessions.create(sessionConfig);
        console.log(session.id);
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
function setupPurchaseCourseSession(info, sessionId) {
    const config = setupBaseSessionConfig(info, sessionId);
    config.line_items = [
        {
            name: 'compra',
            description: 'E godi',
            amount: 10000,
            currency: 'usd',
            quantity: 1
        }
    ];
    return config;
}
function setupBaseSessionConfig(info, sessionId) {
    const config = {
        payment_method_types: ['card'],
        success_url: `${info.callbackUrl}/?purchaseResult=succes`,
        cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
        client_reference_id: sessionId
    };
    return config;
}
//# sourceMappingURL=checkout.route.js.map