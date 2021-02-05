import { stripeInfoGC } from './stripeInfoG_C';
import { AddressContact, Athlete } from './athlete';
import { Trainer } from './trainer';
export interface User {
  uid: string
  email: string;
  displayName?: string;
  photoURL?: string
  nickname?: string
  givenName?: string
  gender?: string
  dateOfBirth?: Date | any
  athletesID?: string[]
  athletes?: Athlete[]
  trainerID?: string
  trainer?: Trainer
  address?: AddressContact
  userCategory?: string
  stripeInfoGC?: stripeInfoGC
}


