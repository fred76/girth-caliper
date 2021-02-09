import { Request, Response } from "express"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
  callbackUrl: string,
  userId: string,
  stripeAccountTrainer: string,
  productName: string,
  productPrice

}
export async function createCheckoutConnectedAccount(req: Request, res: Response) {

  try {
    console.log("suca");

    const info: RequestInfo = {
      callbackUrl: req.body.callbackUrl,
      userId: req['uid'],
      stripeAccountTrainer: req.body.stripeAccountTrainer,
      productName: req.body.productName,
      productPrice: req.body.productPrice
    }

    console.log(info);

    if (!info.userId) {
      const message = 'User must be authenticated'
      res.status(403).json({ message })
      return
    }

    const checkoutSessionData: any = {
      status: 'ongoing',
      pricingPlanId: '',
      userCategory: ""
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: 'Stainless Steel Water Bottle',
        amount: 1000,
        currency: 'eur',
        quantity: 1,
      }],
      payment_intent_data: {
        application_fee_amount: 123,
      },

      success_url: `${info.callbackUrl}/success.html?session_id=${info.userId}`,
      cancel_url: `${info.callbackUrl}/canceled.html`,
    }, {
      stripeAccount: info.stripeAccountTrainer,
    });

    console.log("stripeCheckoutSessionId");
    console.log(session.id);


    res.status(200).json({
      stripeCheckoutSessionId: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      account_id: info.stripeAccountTrainer
    })

  }

  catch (error) {
    console.log("Unespected error while purchasing ", error);
    res.status(500).json({ error: "Could not intiate Stripe CHKO connected Session" })
  }

}
