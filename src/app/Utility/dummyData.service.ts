
import { SkinfoldsForDB as SkinfoldsForDB } from '../interface-model/skinfold.model';
import { Girths } from './../interface-model/girths.model';
import { Utility } from 'src/app/Utility/utility';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DummyDataService {

  constructor(private utility: Utility) { }

  dummyArray = []

  dummyArraySkinfolds = []

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

  createGirth(index) {

    let g: Girths


    let weight = 78 + + this.getRandomInt(-3, 5)
    let neck = 38 + + this.getRandomInt(-3, 5)
    let chest = 100 + + this.getRandomInt(-3, 5)
    let bicep_R = 32 + + this.getRandomInt(-3, 5)
    let bicep_L = 32 + + this.getRandomInt(-3, 5)
    let bicep_R_Relax = 28 + this.getRandomInt(-3, 5)
    let bicep_L_Relax = 29 + this.getRandomInt(-3, 5)
    let forearm_R = 25 + + this.getRandomInt(-3, 5)
    let forearm_L = 25 + + this.getRandomInt(-3, 5)
    let wrist = 18 + + this.getRandomInt(-3, 5)
    let waist = 88 + + this.getRandomInt(-3, 5)
    let hips = 105 + + this.getRandomInt(-3, 5)
    let thigh_R = 55 + + this.getRandomInt(-3, 5)
    let thigh_L = 55 + + this.getRandomInt(-3, 5)
    let calf_L = 38 + + this.getRandomInt(-3, 5)
    let calf_R = 38 + + this.getRandomInt(-3, 5)

    g = {
      neck: neck,
      chest: chest,
      bicep_R: bicep_R,
      bicep_L: bicep_L,
      bicep_R_Relax: bicep_R_Relax,
      bicep_L_Relax: bicep_L_Relax,
      forearm_R: forearm_R,
      forearm_L: forearm_L,
      wrist: wrist,
      waist: waist,
      hips: hips,
      thigh_R: thigh_R,
      thigh_L: thigh_L,
      calf_R: calf_R,
      calf_L: calf_L,
      weight: weight,
      date: this.dateOfMeasurement(- index, - index)

    }
    return g
  }

  createSkinfold(index) {
    let skinfolds: SkinfoldsForDB
    let Chest = 12 + this.getRandomInt(-3, 5)
    let Subscapular = 5 + this.getRandomInt(-3, 5)
    let Midaxillary = 6 + this.getRandomInt(-3, 5)
    let Triceps = 8 + this.getRandomInt(-3, 5)
    let Suprailiac = 6 + this.getRandomInt(-3, 5)
    let Abdominal = 9 + this.getRandomInt(-3, 5)
    let Thigh = 12 + this.getRandomInt(-3, 5)
    let date = this.dateOfMeasurement(-index, 0)
    let weight = 90 + this.getRandomInt(-5, 5)
    let age = 44 - (index * 2)
    let sum = (Chest + Subscapular + Midaxillary + Triceps + Suprailiac + Abdominal + Thigh)
    let body = this.utility.formulaJPMan7(sum, age).bodyDensity
    let bodyRounded = this.utility.numberDecimal(body, 2)
    let bodyFatPerc: number = this.utility.numberDecimal((((4.95 / body) - 4.5) * 100), 2)
    let fatMass: number = this.utility.numberDecimal(((weight / 100) * bodyFatPerc), 2)
    let leanMass = this.utility.numberDecimal((weight - fatMass), 2)
    skinfolds = {
      fold: {
        Chest: Chest,
        Subscapular: Subscapular,
        Midaxillary: Midaxillary,
        Triceps: Triceps,
        Suprailiac: Suprailiac,
        Abdominal: Abdominal,
        Thigh: Thigh
      },
      metadata: {
        method: "jackson & Polloc 7 point Man",
        date: date,
        weight: weight,
        age: age
      },
      bodyResult: {
        bodyDensity: bodyRounded,
        bodyFatPercentage: bodyFatPerc,
        fatMass: fatMass,
        leanMass: leanMass,
        skinfoldsSum: sum
      }
    }
    return skinfolds
  }

  dateOfMeasurement(m, d) {
    let dateDummy = new Date()
    dateDummy.setMonth(dateDummy.getMonth() + m)
    dateDummy.setDate(dateDummy.getDate() + d)
    return dateDummy
  }

}
