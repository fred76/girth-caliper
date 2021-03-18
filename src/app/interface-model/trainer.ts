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
  titleHeading?: string,
  title?: string,
  leitmotif?: string,
  bioTitle?: string,
  bioSubtitle?: string,
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
  currency?: string,
  trainingType: TrainingType[]
}

export interface TrainingType {
  bodyBuilding?: "Bodybuilding",
  bycicling?: "Bycicling",
  calisthenics?: "Calisthenics",
  crossfit?: "Crossfit",
  functionalTraining?: "Functional training",
  hiit?: "HIIT",
  liis?: "LIIS",
  nutrition?: "Nutrition",
  pilates?: "Pilates",
  powerlifting?: "Powerlifting",
  running?: "Running",
  stretching?: "Stretching",
  swimming?: "Swimming",
  yoga?: "Yoga",
  bodyRecomposiotion?: "Body recomposiotion"
}

