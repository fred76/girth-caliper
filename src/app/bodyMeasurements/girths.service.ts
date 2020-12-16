import { FireDatabaseService } from '../Services/fire-database.service';
import { Utility } from 'src/app/Utility/utility';
import { Girths } from '../interface-model/girths.model';

import { GirthTile } from '../interface-model/girths.model';

import { Injectable } from '@angular/core';

@Injectable()
export class GirthsService {

  constructor(private utility: Utility, private fireDatabaseService: FireDatabaseService) { }

  girthTiles: GirthTile[] = [
    { shortName: "weight", title: "Body weight", value: null },
    { shortName: "neck", title: "Neck", value: null },
    { shortName: "chest", title: "Chest", value: null },
    { shortName: "bicep_R", title: "Bicep Rigth", value: null },
    { shortName: "bicep_L", title: "Bicep Left", value: null },
    { shortName: "bicep_R_Relax", title: "Bicep Relaxed Rigth", value: null },
    { shortName: "bicep_L_Relax", title: "Bicep Relaxed Left", value: null },
    { shortName: "forearm_R", title: "Forearm Rigth", value: null },
    { shortName: "forearm_L", title: "Forearm Left", value: null },
    { shortName: "wrist", title: "Wrist", value: null },
    { shortName: "waist", title: "Waist", image: "waist.png", value: null },
    { shortName: "hips", title: "Hips", image: "hips.png", value: null },
    { shortName: "thigh_R", title: "Thigt Rigth", image: "thigh_R.png", value: null },
    { shortName: "thigh_L", title: "Thigt Left", image: "thigh_R.png", value: null },
    { shortName: "calf_L", title: "Calf Rigth", value: null },
    { shortName: "calf_R", title: "Calf Left", value: null }
  ]

  girthTilesDescription: GirthTile[] = [
    { image: "weighter.png", text: "Stand still, with your weight distributed evenly on both feet." },
    { image: "neck.png", text: "Standing, measure your neck at its largest girth, right over the Adam’s apple." },
    { image: "chest.png", text: "Standing, measure with breath out just above the nipple." },
    { image: "bicep_R.png", text: "Measure at its largest girth, flexed with arm bent." },
    { image: "bicep_L.png", text: "Measure at its largest girth, flexed with arm bent." },
    { image: "bicep_R_Relax.png", text: "Measure at its largest girth, flexed with arm relaxed." },
    { image: "bicep_L_Relax.png", text: "Measure at its largest girth, flexed with arm relaxed." },
    { image: "forearm_R.png", text: "Measure at its largest girth, hand clenched." },
    { image: "forearm_L.png", text: "Measure at its largest girth, hand clenched." },
    { image: "wrist.png", text: "Measure at wrist joint hand open." },
    { image: "waist.png", text: "Standing, measure at the narrowest point or at the midway point between the top of the hip bone and the bottom of the rib cage." },
    { image: "hips.png", text: "Measure at the largest girth, where the butt is protruding the greatest." },
    { image: "thigh_R.png", text: "Standing, measure at the largest girth, just below the butt." },
    { image: "thigh_R.png", text: "Standing, measure at the largest girth, just below the butt." },
    { image: "calf_R.png", text: "Seated if you are measuring yourself or standing if you have a partner, measure at its largest girth." },
    { image: "calf_L.png", text: "Seated if you are measuring yourself or standing if you have a partner, measure at its largest girth." }
  ]

  dateOfMeasurement(x) {
    let d = new Date()
    d.setMonth(d.getMonth() + x)
    return d
  }

  saveGirthsToDB(date: string) {
    const girthsObject: Girths = {};
    this.girthTiles.map(item => {
      girthsObject[item.shortName] = item.value
    })
    girthsObject.date = date
    this.fireDatabaseService.addGirthsToDB({ ...girthsObject })
  }
}
