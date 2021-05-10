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

