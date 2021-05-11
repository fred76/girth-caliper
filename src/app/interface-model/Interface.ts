export type UserType<T> = {
  uid: string
  email: string;
  displayName?: string;
  photoURL?: string
  nickname?: string
  givenName?: string
  gender?: string
  dateOfBirth?: Date | any
  stripeInfoGC?: stripeInfoGC
  userCategory?: "trainer" | "athlete"
  profile?: T // trainer | athlete
}


export interface Trainer {
  address?: AddressContact
  trainerStripeConnected?: string
  athletesID?: string[]
  athletes?: Athlete[]
  athleteAdmission?: "fromGC" | "withContact"
  stripeAccount?: boolean
  blog?: boolean
  blogID?: [String]
  bio?: string
  userCategory?: string
}

export interface Athlete {
  TrainerUID?: string
  trainedPaiedWith?: "cash" | "card" | "paypal"
  teamMembership?: boolean
  teamName?: string
  trainingStart?: Date | any
  trainingEnd?: Date | any
  currentTraining?: Training
  pastTraining?: Training[]
  athleteBio?: string
  productPurchased: {}
  userCategory?: string
}

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


export interface AddressContact {
  companyName?: string
  address1?: string,
  address2?: string,
  country?: string,
  state_province_region?: string
  city?: string
  zip_postalCode?: string
  phone?: number
  mobile?: number
  emailBusiness?: string
  web?: string
}

export interface Training {
  TrainerUID?: string


}


