import * as express from 'express'
import { Application } from "express"
import { createCheckoutSession } from './checkout.route'
import { subscripitonUnsubscription } from './subscripitonUnsubscription.route'
import { getUserMiddleware } from './get-user.middleware'
import { stripeWebhooks } from './stripe-webhooks.route'
import { trainerCreateStripeAccount, trainerRetreiveStripeAccount, trainerUdateStripeAccount } from './connected-account-routes'
import { createCheckoutConnectedAccount } from './checkout-connected-account.route'
import * as cors from "cors";
import { stripeWebhooksConnected } from './stripe-webhooks-connected.route'

export function initServer() {

  const bodyParser = require('body-parser')

  const app: Application = express()

  app.use(cors());

  app.route("/").get((req, res) => {
    res.status(200).send("<h1>API is up and running</h1>")
  })

  app.route("/api/checkout").post(
    bodyParser.json(), getUserMiddleware, createCheckoutSession);

  app.route("/api/subscripitonUnsubscription").post(
    bodyParser.json(), getUserMiddleware, subscripitonUnsubscription);

  app.route("/api/account-link").post(
    bodyParser.json(), getUserMiddleware, trainerCreateStripeAccount);

  app.route("/api/account-update").post(
    bodyParser.json(), getUserMiddleware, trainerUdateStripeAccount);

  app.route("/api/account-retreive").post(
    bodyParser.json(), getUserMiddleware, trainerRetreiveStripeAccount);

  app.route("/api/checkoutConnectedAccount").post(
    bodyParser.json(), getUserMiddleware, createCheckoutConnectedAccount);

  app.route("/stripe-webhooks").post(bodyParser.raw({ type: 'application/json' }), stripeWebhooks)

  app.route("/stripe-webhooks/connect").post(bodyParser.raw({ type: 'application/json' }), stripeWebhooksConnected)


  const PORT = process.env.PORT || 9000

  app.listen(PORT, () => {
    console.log("HTTP REST API Server running at port " + PORT);
  })

}
