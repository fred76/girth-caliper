"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscripitonUnsubscription = void 0;
const database_1 = require("./database");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function subscripitonUnsubscription(req, res) {
    try {
        const info = {
            cancelAtPeriodEnd: req.body.cancelAtPeriodEnd,
            callbackUrl: req.body.callbackUrl,
            userId: req['uid'],
            subscriptionId: req.body.subscriptionId,
            isDeleteSubscription: req.body.isDeleteSubscription,
            deleteSubscription: req.body.deleteSubscription,
        };
        if (!info.userId) {
            const message = 'User must be authenticated';
            res.status(403).json({ message });
            return;
        }
        if (!info.isDeleteSubscription) {
            const unsuscribeData = {
                cancel_at_period_end: false
            };
            unsuscribeData.cancel_at_period_end = info.cancelAtPeriodEnd;
            const userRef = database_1.db.doc(`users/${info.userId}`);
            await userRef.set(unsuscribeData, { merge: true });
            const subscription = await stripe.subscriptions.update(info.subscriptionId, { cancel_at_period_end: info.cancelAtPeriodEnd });
        }
        else {
            const deleted = await stripe.subscriptions.del(info.subscriptionId);
            if (deleted) {
                const userRef = database_1.db.doc(`users/${info.userId}`);
                await userRef.set({ status: "cancelled" }, { merge: true });
            }
        }
        const subscriptions = await stripe.subscriptions.list({
            status: "all"
        });
        res.status(200);
    }
    catch (error) {
        console.log("Unespected error while purchasing ", error);
        res.status(500).json({ error: "Could not intiate Stripe CHKO Session" });
    }
}
exports.subscripitonUnsubscription = subscripitonUnsubscription;
//# sourceMappingURL=subscripitonUnsubscription.route.js.map