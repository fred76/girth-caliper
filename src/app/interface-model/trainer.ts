export interface Trainer {
  athletesUID?: string[]
  athleteAdmission?: "fromGC" | "withContact"
  stripeAccount?: boolean
  blog?: boolean
  blogID?: [String]
  bio?: string
}
export interface TrainerBio {

}

export interface Blog {
  Author?: string
  date?: Date | any
  article?: string
  imageURL1?: string
  imageURL2?: string
  imageURL3?: string
}

export interface TrainerProduct {
  productID?: string
  description?: string
  price?: string
  quantity?: number
}

