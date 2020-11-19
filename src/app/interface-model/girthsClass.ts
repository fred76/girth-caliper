import { Girths } from './girths.model';

export class GirthsClass implements Girths {
  neck?: number;
  chest?: number;
  bicep_L?: number;
  bicep_L_Relax?: number;
  bicep_R?: number;
  bicep_R_Relax?: number;
  forearm_L?: number;
  forearm_R?: number;
  wrist?: number;
  waist?: number;
  hips?: number;
  thigh_L?: number;
  thigh_R?: number;
  calf_R?: number;
  calf_L?: number;
  weight?: number;
  date: Date | any;

  constructor() {
    this.neck = 0
    this.chest = 0
    this.bicep_L = 0
    this.bicep_L_Relax = 0
    this.bicep_R = 0
    this.bicep_R_Relax = 0
    this.forearm_L = 0
    this.forearm_R = 0
    this.wrist = 0
    this.waist = 0
    this.hips = 0
    this.thigh_L = 0
    this.thigh_R = 0
    this.calf_R = 0
    this.calf_L = 0
    this.weight = 0
    this.date = Date()
  }
}
