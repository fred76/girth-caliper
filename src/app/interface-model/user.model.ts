import { AddressContact } from './athlete';
export interface User {
  uid: string
  email: string;
  displayName?: string;
  photoURL?: string
  nickname?: string
  givenName?: string
  gender?: string
  dateOfBirth?: Date | any
  pricingPlanId?: string
  stripeCustomerId?: string
  subscriptionId?: string
  created?: Date | any
  status?: string
  cancel_at_period_end?: boolean
  current_period_end?: Date | any
  current_period_start?: Date | any
  userCategory?: string // athlete or trainer
  athletesID?: string[]
  trainerID?: string
  address?: AddressContact

}


