export interface Trainer {
  athletesUID?: string[]
  athleteAdmission?: "fromGC" | "withContact"
  stripeAccount?: boolean
  blog?: boolean
  blogID?: [String]
  bio?: string
}
export interface TrainerPage {
  backgroundImageURL?: string,
  introTitle?: string,
  introTitleBig?: string,
  introText?: string,
  bioTitle?: string,
  bioSubitle?: string,
  bioText?: string,
  TrainerProducts?: TrainerProduct[]
  cratedON?: Date | any
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
  imgURL?: string,
  titleCard?: string,
  subTitleCard?: string,
  textCard?: string,
  price?: number,
  currency?: string
}

