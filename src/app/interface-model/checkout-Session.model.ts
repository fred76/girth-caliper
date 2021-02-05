export interface CheckoutSession {
  stripeCheckoutSessionId: string,
  stripePublicKey: string
}

export interface CheckoutSessionConnectedAccount {
  stripeCheckoutSessionId: string,
  stripePublicKey: string,
  account_id: string
}
