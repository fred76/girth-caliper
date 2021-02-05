export interface stripeInfoGC {
  pricingPlanId?: string
  stripeCustomerId?: string
  subscriptionId?: string
  created?: Date | any
  status?: string
  cancel_at_period_end?: boolean
  current_period_end?: Date | any
  current_period_start?: Date | any
}
