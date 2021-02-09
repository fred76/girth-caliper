import { Training } from "./training";

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
