
import { Response, Request } from 'express';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function stripeWebhooksConnected(req: Request, res: Response) {

  try {
  } catch (error) {
  }

}
