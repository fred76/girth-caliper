import { ChartType } from 'chart.js';

import { Response, Request } from 'express';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function stripeWebhooksConnected(req: Request, res: Response) {

  try {

    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)


    console.log("event.type                                                           " + event.type);
    console.log(event);



  } catch (error) {
  }

}
