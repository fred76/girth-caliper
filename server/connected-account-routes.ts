import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
  callbackUrl: string,
}
export async function trainerCreateStripeAccount(req: Request, res: Response) {

  const state = uuidv4()

  const info: RequestInfo = {
    callbackUrl: req.body.callbackUrl
  }
  const account = await stripe.accounts.create({ type: "standard" });
  const accountID = account.id;
  const accountLinkURL = await stripe.accountLinks.create({
    type: "account_onboarding",
    account: accountID,
    refresh_url: `http://localhost:4200/Body&Measurements/trainer/trainerBio`,
    return_url: `http://localhost:4200/Body&Measurements/trainer/trainerBio`,

  })
    .then((link) => {
      link.url
      res.status(200).json({
        url: link.url
      })
    });
}


interface RequestedCode {
  code: string
}

export async function trainerOAuthaccount(req: Request, res: Response) {

  const info: RequestedCode = {
    code: req.body.code
  }

  const code = info.code

  const resp = await stripe.oauth.token({
    grant_type: 'authorization_code',
    code
  })

  console.log("resp");
  console.log(resp);
  console.log("resp");


  stripe.oauth.token({
    grant_type: 'authorization_code',
    code
  }).then(
    (response) => {
      var connected_account_id = response.stripe_user_id;
      console.log("response");
      console.log(response);

      console.log("connected_account_id");
      console.log(connected_account_id);


      // Render some HTML or redirect to a different page.
      return res.redirect(301, '/success.html')
    },
    (err) => {
      if (err.type === 'StripeInvalidGrantError') {
        return res.status(400).json({ error: 'Invalid authorization code: ' + code });
      } else {
        return res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  );




}



