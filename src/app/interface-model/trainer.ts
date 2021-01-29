 import { TrainerBio } from './trainerBio';

export interface Trainer {
  athletesUID?: string[]
  athleteAdmission?: "fromWeb" | "email" | "inHouse"
  bio?: TrainerBio
}
