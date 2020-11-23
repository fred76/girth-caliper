import { CaliperForDB } from './../interface-model/caliper.model';
import { Girths } from './../interface-model/girths.model';
import { Utility } from 'src/app/Utility/utility';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DummyDataService {

  constructor(private utility: Utility) { }



  weight = 78
  neck = 38
  chest = 100
  bicep_R = 32
  bicep_L = 32
  bicep_R_Relax = 28
  bicep_L_Relax = 28
  forearm_R = 25
  forearm_L = 25
  wrist = 18
  waist = 88
  hips = 105
  thigh_R = 55
  thigh_L = 55
  calf_L = 38
  calf_R = 38


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }
  girthTiles0: Girths = {
    weight: this.weight + this.getRandomInt(-20, 20),
    neck: this.neck + this.getRandomInt(-2, 4),
    chest: this.chest + this.getRandomInt(-3, 10),
    bicep_R: this.bicep_R + this.getRandomInt(-5, 6),
    bicep_L: this.bicep_L + this.getRandomInt(-5, 6),
    bicep_R_Relax: this.bicep_R_Relax + this.getRandomInt(-3, 6),
    bicep_L_Relax: this.bicep_L_Relax + this.getRandomInt(-3, 6),
    forearm_R: this.forearm_R + this.getRandomInt(-3, 5),
    forearm_L: this.forearm_L + this.getRandomInt(-3, 5),
    wrist: this.wrist + this.getRandomInt(1, 2),
    waist: this.waist + this.getRandomInt(-5, 10),
    hips: this.hips + this.getRandomInt(-11, 16),
    thigh_R: this.thigh_R + this.getRandomInt(-4, 6),
    thigh_L: this.thigh_L + this.getRandomInt(-4, 6),
    calf_L: this.calf_L + this.getRandomInt(-3, 6),
    calf_R: this.calf_R + this.getRandomInt(-3, 6),
    date: this.dateOfMeasurement(-5.6)

  }


  girthTiles1: Girths =
    {
      weight: this.weight + this.getRandomInt(-20, 20),
      neck: this.neck + this.getRandomInt(-2, 4),
      chest: this.chest + this.getRandomInt(-3, 10),
      bicep_R: this.bicep_R + this.getRandomInt(-5, 6),
      bicep_L: this.bicep_L + this.getRandomInt(-5, 6),
      bicep_R_Relax: this.bicep_R_Relax + this.getRandomInt(-3, 6),
      bicep_L_Relax: this.bicep_L_Relax + this.getRandomInt(-3, 6),
      forearm_R: this.forearm_R + this.getRandomInt(-3, 5),
      forearm_L: this.forearm_L + this.getRandomInt(-3, 5),
      wrist: this.wrist + this.getRandomInt(1, 2),
      waist: this.waist + this.getRandomInt(-5, 10),
      hips: this.hips + this.getRandomInt(-11, 16),
      thigh_R: this.thigh_R + this.getRandomInt(-4, 6),
      thigh_L: this.thigh_L + this.getRandomInt(-4, 6),
      calf_L: this.calf_L + this.getRandomInt(-3, 6),
      calf_R: this.calf_R + this.getRandomInt(-3, 6),
      date: this.dateOfMeasurement(-4.3)
    }
  girthTiles2: Girths =
    {
      weight: this.weight + this.getRandomInt(-20, 20),
      neck: this.neck + this.getRandomInt(-2, 4),
      chest: this.chest + this.getRandomInt(-3, 10),
      bicep_R: this.bicep_R + this.getRandomInt(-5, 6),
      bicep_L: this.bicep_L + this.getRandomInt(-5, 6),
      bicep_R_Relax: this.bicep_R_Relax + this.getRandomInt(-3, 6),
      bicep_L_Relax: this.bicep_L_Relax + this.getRandomInt(-3, 6),
      forearm_R: this.forearm_R + this.getRandomInt(-3, 5),
      forearm_L: this.forearm_L + this.getRandomInt(-3, 5),
      wrist: this.wrist + this.getRandomInt(1, 2),
      waist: this.waist + this.getRandomInt(-5, 10),
      hips: this.hips + this.getRandomInt(-11, 16),
      thigh_R: this.thigh_R + this.getRandomInt(-4, 6),
      thigh_L: this.thigh_L + this.getRandomInt(-4, 6),
      calf_L: this.calf_L + this.getRandomInt(-3, 6),
      calf_R: this.calf_R + this.getRandomInt(-3, 6),
      date: this.dateOfMeasurement(-3.2)
    }

  girthTiles3: Girths =
    {
      weight: this.weight + this.getRandomInt(-20, 20),
      neck: this.neck + this.getRandomInt(-2, 4),
      chest: this.chest + this.getRandomInt(-3, 10),
      bicep_R: this.bicep_R + this.getRandomInt(-5, 6),
      bicep_L: this.bicep_L + this.getRandomInt(-5, 6),
      bicep_R_Relax: this.bicep_R_Relax + this.getRandomInt(-3, 6),
      bicep_L_Relax: this.bicep_L_Relax + this.getRandomInt(-3, 6),
      forearm_R: this.forearm_R + this.getRandomInt(-3, 5),
      forearm_L: this.forearm_L + this.getRandomInt(-3, 5),
      wrist: this.wrist + this.getRandomInt(1, 2),
      waist: this.waist + this.getRandomInt(-5, 10),
      hips: this.hips + this.getRandomInt(-11, 16),
      thigh_R: this.thigh_R + this.getRandomInt(-4, 6),
      thigh_L: this.thigh_L + this.getRandomInt(-4, 6),
      calf_L: this.calf_L + this.getRandomInt(-3, 6),
      calf_R: this.calf_R + this.getRandomInt(-3, 6),
      date: this.dateOfMeasurement(-2.5)
    }



  dateOfMeasurement(x) {
    let dateDummy = new Date()
    dateDummy.setMonth(dateDummy.getMonth() + x)
    return dateDummy
  }
  dummyArray = [
    this.girthTiles0,
    this.girthTiles1,
    this.girthTiles2,
    this.girthTiles3
  ]

  pippo() {
    let caliper5: CaliperForDB
    for (let index = 0; index < 10; index++) {
      let Chest = 12 + this.getRandomInt(-3, 5)
      let Subscapular = 5 + this.getRandomInt(-3, 5)
      let Midaxillary = 6 + this.getRandomInt(-3, 5)
      let Triceps = 8 + this.getRandomInt(-3, 5)
      let Suprailiac = 6 + this.getRandomInt(-3, 5)
      let Abdominal = 9 + this.getRandomInt(-3, 5)
      let Thigh = 12 + this.getRandomInt(-3, 5)
      let date = this.dateOfMeasurement(-index)
      let weight = 90 + this.getRandomInt(-5, 5)
      let age = 44 - (index * 2)
      let sum = (Chest + Subscapular + Midaxillary + Triceps + Suprailiac + Abdominal + Thigh)
      let body = this.utility.formulaJPMan7(sum, age).bodyDensity
      let bodyRounded = this.utility.numberDecimal(body, 2)
      let bodyFatPerc: number = this.utility.numberDecimal((((4.95 / body) - 4.5) * 100), 2)
      let fatMass: number = this.utility.numberDecimal(((weight / 100) * bodyFatPerc), 2)
      let leanMass = this.utility.numberDecimal((weight - fatMass), 2)
      caliper5 = {
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
      this.dummyArrayCaliper.push(caliper5)
    }
  }

  dummyArrayCaliper = []


}
