import { FireDatabaseService } from '../Services/fire-database.service';
import { SkinfoldsForDB } from '../interface-model/skinfold.model';
import { Utility } from 'src/app/Utility/utility';
import { SkinfoldsTile } from '../interface-model/skinfold.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class SkinfoldsService {

  constructor(private utility: Utility, private db: FireDatabaseService) { }

  selectedSkinfoldsMethod = new Subject<string>()

  selectedSkinfoldsMethod$ = this.selectedSkinfoldsMethod.asObservable()

  skinfoldsTiles: SkinfoldsTile[]

  skinfoldsTilesDescriptions: SkinfoldsTile[]

  selectedSkinfoldsMethodSubscription: Subscription

  skinfoldsObjectForDB: SkinfoldsForDB

  skinfoldsMethodsMan = [
    "jackson & Polloc 7 point Man",
    "jackson & Polloc 3 point Man",
    "Sloan - Men 2 point",
    "Durnin & Womersley Man",
  ]
  skinfoldsMethodsWoman = [
    "jackson & Polloc 7 point Woman",
    "jackson & Polloc 3 point Woman",
    "Sloan - Woman 2 point",
    "Durnin & Womersley Woman"
  ]


  selectedSkinfoldsMethodSubs() {
    this.selectedSkinfoldsMethodSubscription = this.selectedSkinfoldsMethod$.subscribe(data => {
      this.skinfoldsTiles = []
      this.skinfoldsTilesDescriptions = []
      switch (true) {
        case data == "jackson & Polloc 7 point Man":
          this.skinfoldsTiles = [
            { title: "Chest", value1: null, value2: null, value3: null },
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Midaxillary", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "petto.png", text: "Diagonal fold Men: one-half the distance between the anterior axillary line (crease of the underarm) and the nipple Women: one-third of the distance between the anterior axillary line and the nipple." },
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "ascella.png", text: "Vertical or Horizontal fold Midaxillary line at the level of the xiphoid process of the sternum" },
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." },
            { image: "addome.png", text: "Vertical (modern technique) 2 cm or 1 inch to the right side of the umbilicus  Horizontal fold (traditional) 2 cm to the right side of the umbilicus." },
            { image: "coscia.png", text: "Vertical fold Anterior midline of the thigh Midway between the proximal border of the patella (upper knee) and the inguinal crease (hip)." }
          ]
          break
        case data == "jackson & Polloc 7 point Woman":
          this.skinfoldsTiles = [
            { title: "Chest", value1: null, value2: null, value3: null },
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Midaxillary", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "petto.png", text: "Diagonal fold Men: one-half the distance between the anterior axillary line (crease of the underarm) and the nipple Women: one-third of the distance between the anterior axillary line and the nipple." },
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "ascella.png", text: "Vertical or Horizontal fold Midaxillary line at the level of the xiphoid process of the sternum" },
            { image: "tricipite.png", text: "Measure at its largest girth, flexed with arm bent.." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." },
            { image: "addome.png", text: "Vertical (modern technique) 2 cm or 1 inch to the right side of the umbilicus  Horizontal fold (traditional) 2 cm to the right side of the umbilicus." },
            { image: "coscia.png", text: "Vertical fold Anterior midline of the thigh Midway between the proximal border of the patella (upper knee) and the inguinal crease (hip)." }
          ]
          break
        case data == "jackson & Polloc 3 point Man":
          this.skinfoldsTiles = [
            { title: "Chest", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "petto.png", text: "Diagonal fold Men: one-half the distance between the anterior axillary line (crease of the underarm) and the nipple Women: one-third of the distance between the anterior axillary line and the nipple." },
            { image: "addome.png", text: "Vertical (modern technique) 2 cm or 1 inch to the right side of the umbilicus  Horizontal fold (traditional) 2 cm to the right side of the umbilicus." },
            { image: "coscia.png", text: "Vertical fold Anterior midline of the thigh Midway between the proximal border of the patella (upper knee) and the inguinal crease (hip)." }
          ]
          break
        case data == "jackson & Polloc 3 point Woman":
          this.skinfoldsTiles = [
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." },
            { image: "addome.png", text: "Vertical (modern technique) 2 cm or 1 inch to the right side of the umbilicus  Horizontal fold (traditional) 2 cm to the right side of the umbilicus." }
          ]
          break
        case data == "Sloan - Men 2 point":
          this.skinfoldsTiles = [
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "coscia.png", text: "Vertical fold Anterior midline of the thigh Midway between the proximal border of the patella (upper knee) and the inguinal crease (hip)." }
          ]
          break
        case data == "Sloan - Woman 2 point":
          this.skinfoldsTiles = [
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." }
          ]
          break
        case data == "Durnin & Womersley Man":
          this.skinfoldsTiles = [
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Bicep", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "bicipite.png", text: "Vertical fold Anterior aspect of the arm over the belly of the biceps muscle 1 cm above the level used to mark the triceps site." },
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Measure at its largest girth, flexed with arm bent." }
          ]
          break
        case data == "Durnin & Womersley Woman":
          this.skinfoldsTiles = [
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Bicep", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null }
          ]
          this.skinfoldsTilesDescriptions = [
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "bicipite.png", text: "Vertical fold Anterior aspect of the arm over the belly of the biceps muscle 1 cm above the level used to mark the triceps site." },
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." }
          ]
          break
      }
    })
  }

  updateSelectedSkinfoldsrMethod(newMethod: string) {
    this.selectedSkinfoldsMethod.next(newMethod)
  }

  selectedSkinfoldsMethodUnsubscribe() {
    this.selectedSkinfoldsMethodSubscription.unsubscribe()
  }

  createSkinFoldObject(method: string, age: number, weight: number, date?: Date) {
    let c = new SkinfoldsForDB()
    c.fold = {}
    let foldSkinTitleArray: string[] = []
    let foldSkinValueArray: number[] = []
    let bodyDensity: number
    let sum: number = 0
    let thigh: number = 0
    let subscapular: number = 0
    let triceps: number = 0
    let suprailiac: number = 0

    this.skinfoldsTiles.map((item) => {

      let div = 0

      if (item.value1 !== null) { div++ }
      if (item.value2 !== null) { div++ }
      if (item.value3 !== null) { div++ }

      let avarage = (item.value1 + item.value2 + item.value3) / div

      switch (true) {
        case item.title == "Chest": c.fold.Chest = avarage; foldSkinTitleArray.push("Chest"); foldSkinValueArray.push(avarage); sum += avarage; break
        case item.title == "Subscapular": c.fold.Subscapular = avarage; foldSkinTitleArray.push("Subscapular"); foldSkinValueArray.push(avarage); sum += avarage; subscapular = avarage; break
        case item.title == "Midaxillary": c.fold.Midaxillary = avarage; foldSkinTitleArray.push("Midaxillary"); foldSkinValueArray.push(avarage); sum += avarage; break
        case item.title == "Triceps": c.fold.Triceps = avarage; foldSkinTitleArray.push("Triceps"); foldSkinValueArray.push(avarage); sum += avarage; triceps = avarage; break
        case item.title == "Suprailiac": c.fold.Suprailiac = avarage; foldSkinTitleArray.push("Suprailiac"); foldSkinValueArray.push(avarage); sum += avarage; suprailiac = avarage; break
        case item.title == "Abdominal": c.fold.Abdominal = avarage; foldSkinTitleArray.push("Abdominal"); foldSkinValueArray.push(avarage); sum += avarage; break
        case item.title == "Thigh": c.fold.Thigh = avarage; foldSkinTitleArray.push("Thigh"); foldSkinValueArray.push(avarage); sum += avarage; thigh = avarage; break
        case item.title == "Bicep": c.fold.Bicep = avarage; foldSkinTitleArray.push("Bicep"); foldSkinValueArray.push(avarage); sum += avarage; break
      }
    })

    switch (true) {
      case method == "jackson & Polloc 7 point Man": bodyDensity = this.utility.formulaJPMan7(sum, age).bodyDensity
        break
      case method == "jackson & Polloc 7 point Woman": bodyDensity = this.utility.formulaJPWoman7(sum, age).bodyDensity
        break
      case method == "jackson & Polloc 3 point Man": bodyDensity = this.utility.formulaJPMan3({ sum, age }).bodyDensity
        break
      case method == "jackson & Polloc 3 point Woman": bodyDensity = this.utility.formulaJPWoman3(sum, age).bodyDensity
        break
      case method == "Sloan - Men 2 point":
        bodyDensity = this.utility.formulaSloanMan2(thigh, subscapular).bodyDensity
        break
      case method == "Sloan - Woman 2 point":
        bodyDensity = this.utility.formulaSloanWoman2(suprailiac, triceps).bodyDensity
        break
      case method == "Durnin & Womersley Man": bodyDensity = this.utility.formulaDurninWomersleyMan(sum, age).bodyDensity
        break
      case method == "Durnin & Womersley Woman": bodyDensity = this.utility.formulaDurninWomersleyWoman(sum, age).bodyDensity
        break
    }

    let bodyFatPerc: number = this.utility.numberDecimal((((4.95 / bodyDensity) - 4.5) * 100), 2)
    let fatMass: number = this.utility.numberDecimal(((weight / 100) * bodyFatPerc), 2)
    let leanMass = weight - fatMass

    c.metadata = { method: method, date: date, weight: weight, age: age }

    c.bodyResult = {
      bodyDensity: bodyDensity,
      bodyFatPercentage: bodyFatPerc,
      fatMass: fatMass,
      leanMass: leanMass,
      skinfoldsSum: sum
    }

    this.skinfoldsObjectForDB = c
    return { c, bodyDensity, bodyFatPerc, sum, fatMass, leanMass, foldSkinValueArray, foldSkinTitleArray, weight, method, date, age }

  }

  saveSkinfoldToDB() {

    this.db.addSkinfoldsToDB({ ...this.skinfoldsObjectForDB })

  }



}


