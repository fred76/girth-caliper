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

  caliper1: CaliperForDB = {
    fold: {
      Chest: 12 + this.getRandomInt(-3, 5),
      Subscapular: 5 + this.getRandomInt(-3, 5),
      Midaxillary: 6 + this.getRandomInt(-3, 5),
      Triceps: 8 + this.getRandomInt(-3, 5),
      Suprailiac: 6 + this.getRandomInt(-3, 5),
      Abdominal: 9 + this.getRandomInt(-3, 5),
      Thigh: 12 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "jackson & Polloc 7 point Man",
      date: this.dateOfMeasurement(-5.6),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }
  caliper2: CaliperForDB = {
    fold: {
      Chest: 15 + this.getRandomInt(-3, 5),
      Abdominal: 7 + this.getRandomInt(-3, 5),
      Thigh: 10 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "jackson & Polloc 3 point Man",
      date: this.dateOfMeasurement(-4.3),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }
  caliper3: CaliperForDB = {
    fold: {
      Subscapular: 9 + this.getRandomInt(-3, 5),
      Thigh: 6 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "Sloan - Men 2 point",
      date: this.dateOfMeasurement(-3.2),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }

  caliper4: CaliperForDB = {
    fold: {
      Subscapular: 7 + this.getRandomInt(-3, 5),
      Bicep: 3 + this.getRandomInt(-3, 5),
      Triceps: 9 + this.getRandomInt(-3, 5),
      Suprailiac: 11 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "Durnin & Womersley Man",
      date: this.dateOfMeasurement(-2.5),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }
  caliper5: CaliperForDB = {
    fold: {
      Chest: 12 + this.getRandomInt(-3, 5),
      Subscapular: 5 + this.getRandomInt(-3, 5),
      Midaxillary: 6 + this.getRandomInt(-3, 5),
      Triceps: 8 + this.getRandomInt(-3, 5),
      Suprailiac: 6 + this.getRandomInt(-3, 5),
      Abdominal: 9 + this.getRandomInt(-3, 5),
      Thigh: 12 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "jackson & Polloc 7 point Man",
      date: this.dateOfMeasurement(-6.6),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }
  caliper6: CaliperForDB = {
    fold: {
      Chest: 15 + this.getRandomInt(-3, 5),
      Abdominal: 7 + this.getRandomInt(-3, 5),
      Thigh: 10 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "jackson & Polloc 3 point Man",
      date: this.dateOfMeasurement(-7.3),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }
  caliper7: CaliperForDB = {
    fold: {
      Subscapular: 9 + this.getRandomInt(-3, 5),
      Thigh: 6 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "Sloan - Men 2 point",
      date: this.dateOfMeasurement(-8.2),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }

  caliper8: CaliperForDB = {
    fold: {
      Subscapular: 7 + this.getRandomInt(-3, 5),
      Bicep: 3 + this.getRandomInt(-3, 5),
      Triceps: 9 + this.getRandomInt(-3, 5),
      Suprailiac: 11 + this.getRandomInt(-3, 5)
    },
    metadata: {
      method: "Durnin & Womersley Man",
      date: this.dateOfMeasurement(-9.5),
      weight: 88 + this.getRandomInt(-20, 20),
      age: 44
    }
  }

  dummyArrayCaliper = [
    this.caliper1,
    this.caliper2,
    this.caliper3,
    this.caliper4,
    this.caliper5,
    this.caliper6,
    this.caliper7,
    this.caliper8
  ]


}
