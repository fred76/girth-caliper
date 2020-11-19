import { DummyDataService } from './../Utility/dummyData.service';
import { CaliperForDB } from './../interface-model/caliper.model';
import { Utility } from 'src/app/Utility/utility';
import { CaliperTile } from '../interface-model/caliper.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaliperService {

  constructor(private utility: Utility, private dummy: DummyDataService) { }

  selectedCaliperMethod = new Subject<string>()
  selectedCaliperMethod$ = this.selectedCaliperMethod.asObservable()

  caliperTiles: CaliperTile[]
  caliperTilesDescriptions: CaliperTile[]

  selectedCaliperMethodSubscription: Subscription

  caliperMethods = [
    "jackson & Polloc 7 point Man",
    "jackson & Polloc 7 point Woman",
    "jackson & Polloc 3 point Man",
    "jackson & Polloc 3 point Woman",
    "Sloan - Men 2 point",
    "Sloan - Woman 2 point",
    "Durnin & Womersley Man",
    "Durnin & Womersley Woman"
  ]

  selectedCaliperMethodSubs() {
    this.selectedCaliperMethodSubscription = this.selectedCaliperMethod$.subscribe(data => {
      this.caliperTiles = []
      this.caliperTilesDescriptions = []
      switch (true) {
        case data == "jackson & Polloc 7 point Man":
          this.caliperTiles = [
            { title: "Chest", value1: null, value2: null, value3: null },
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Midaxillary", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
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
          this.caliperTiles = [
            { title: "Chest", value1: null, value2: null, value3: null },
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Midaxillary", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
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
          this.caliperTiles = [
            { title: "Chest", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
            { image: "petto.png", text: "Diagonal fold Men: one-half the distance between the anterior axillary line (crease of the underarm) and the nipple Women: one-third of the distance between the anterior axillary line and the nipple." },
            { image: "addome.png", text: "Vertical (modern technique) 2 cm or 1 inch to the right side of the umbilicus  Horizontal fold (traditional) 2 cm to the right side of the umbilicus." },
            { image: "coscia.png", text: "Vertical fold Anterior midline of the thigh Midway between the proximal border of the patella (upper knee) and the inguinal crease (hip)." }
          ]
          break
        case data == "jackson & Polloc 3 point Woman":
          this.caliperTiles = [
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null },
            { title: "Abdominal", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." },
            { image: "addome.png", text: "Vertical (modern technique) 2 cm or 1 inch to the right side of the umbilicus  Horizontal fold (traditional) 2 cm to the right side of the umbilicus." }
          ]
          break
        case data == "Sloan - Men 2 point":
          this.caliperTiles = [
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Thigh", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "coscia.png", text: "Vertical fold Anterior midline of the thigh Midway between the proximal border of the patella (upper knee) and the inguinal crease (hip)." }
          ]
          break
        case data == "Sloan - Woman 2 point":
          this.caliperTiles = [
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." }
          ]
          break
        case data == "Durnin & Womersley Man":
          this.caliperTiles = [
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Bicep", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "bicipite.png", text: "Vertical fold Anterior aspect of the arm over the belly of the biceps muscle 1 cm above the level used to mark the triceps site." },
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Measure at its largest girth, flexed with arm bent." }
          ]
          break
        case data == "Durnin & Womersley Woman":
          this.caliperTiles = [
            { title: "Subscapular", value1: null, value2: null, value3: null },
            { title: "Bicep", value1: null, value2: null, value3: null },
            { title: "Triceps", value1: null, value2: null, value3: null },
            { title: "Suprailiac", value1: null, value2: null, value3: null }
          ]
          this.caliperTilesDescriptions = [
            { image: "sottoscapola.png", text: "Diagonal fold 1 to 2 cm below the inferior angle of the scapula." },
            { image: "bicipite.png", text: "Vertical fold Anterior aspect of the arm over the belly of the biceps muscle 1 cm above the level used to mark the triceps site." },
            { image: "tricipite.png", text: "Vertical fold Posterior midline of the upper arm Halfway between the acromion (shoulder) and olecranon processes (elbow) Arm held freely to the side of the body." },
            { image: "soprailliaca.png", text: "Diagonal fold Anterior axillary line (modern technique) immediately superior to the iliac crest in line with the natural angle of the iliac crest taken Mid-axillary line (traditional Superior to the iliac crest." }
          ]
          break
      }
      // this.caliperTiles = this.caliperTiles.filter(i => !removeCaliperTiles.map(j => j.title).includes(i.title));
      // this.caliperTilesDescriptions = this.caliperTilesDescriptions.filter(i => !removeCaliperTilesDescriptions.map(j => j.image).includes(i.image));
    })
  }
  updateSelectedCaliperMethod(newMethod: string) {
    this.selectedCaliperMethod.next(newMethod)
  }

  selectedCaliperMethodUnsubscribe() {
    this.selectedCaliperMethodSubscription.unsubscribe()
  }

  skinfoldTransformDataForDB() {
    let c = new CaliperForDB()
    c.fold = {}
    this.caliperTiles.map((item) => {
      const cal = c.fold
      let div = 0
      if (item.value1 !== null) { div++ }
      if (item.value2 !== null) { div++ }
      if (item.value3 !== null) { div++ }
      let avarage = (item.value1 + item.value2 + item.value3) / div
      switch (true) {
        case item.title == "Chest": c.fold.Chest = avarage; break
        case item.title == "Subscapular": c.fold.Subscapular = avarage; break
        case item.title == "Midaxillary": c.fold.Midaxillary = avarage; break
        case item.title == "Triceps": c.fold.Triceps = avarage; break
        case item.title == "Suprailiac": c.fold.Suprailiac = avarage; break
        case item.title == "Abdominal": c.fold.Abdominal = avarage; break
        case item.title == "Thigh": c.fold.Thigh = avarage; break
        case item.title == "Bicep": c.fold.Bicep = avarage; break
      }
    })
    return c
  }

  feedCalipeCardData(method: string, age: number, weight: number) {
    let skinfoldObject = this.skinfoldTransformDataForDB()

    let foldSkinTitleArray = Object.keys(skinfoldObject.fold)
    let foldSkinValueArray = Object.values(skinfoldObject.fold)


    let sum: number = foldSkinValueArray.reduce(function (a, b) {
      return a + b;
    });

    let bodyDensity: number
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

        let thigh = skinfoldObject.fold.Thigh
        let subscapular = skinfoldObject.fold.Subscapular

        bodyDensity = this.utility.formulaSloanMan2(thigh, subscapular).bodyDensity
        break
      case method == "Sloan - Woman 2 point":

        let triceps = skinfoldObject.fold.Triceps
        let suprailiac = skinfoldObject.fold.Thigh

        bodyDensity = this.utility.formulaSloanWoman2(suprailiac, triceps).bodyDensity
        break
      case method == "Durnin & Womersley Man": bodyDensity = this.utility.formulaDurninWomersleyMan(sum, age).bodyDensity
        break
      case method == "Durnin & Womersley Woman": bodyDensity = this.utility.formulaDurninWomersleyWoman(sum, age).bodyDensity
        break
    }

    let bodyFatPerc: number = ((4.95 / bodyDensity) - 4.5) * 100
    let fatMass: number = (weight / 100) * bodyFatPerc
    let leanMass = weight - fatMass
    return { bodyDensity, bodyFatPerc, sum, fatMass, leanMass, foldSkinValueArray, foldSkinTitleArray, weight }
  }
  feedCaliperDataForChart(caliperForDB: CaliperForDB,) {


    let method: string = caliperForDB.metadata.method
    let age: number = caliperForDB.metadata.age
    let weight: number = caliperForDB.metadata.weight
    let date: Date = caliperForDB.metadata.date

    let foldSkinTitleArray = Object.keys(caliperForDB.fold)
    let foldSkinValueArray = Object.values(caliperForDB.fold)


    let sum: number = foldSkinValueArray.reduce(function (a, b) {
      return a + b;
    });

    let bodyDensity: number
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

        let thigh = caliperForDB.fold.Thigh
        let subscapular = caliperForDB.fold.Subscapular

        bodyDensity = this.utility.formulaSloanMan2(thigh, subscapular).bodyDensity
        break
      case method == "Sloan - Woman 2 point":

        let triceps = caliperForDB.fold.Triceps
        let suprailiac = caliperForDB.fold.Thigh

        bodyDensity = this.utility.formulaSloanWoman2(suprailiac, triceps).bodyDensity
        break
      case method == "Durnin & Womersley Man": bodyDensity = this.utility.formulaDurninWomersleyMan(sum, age).bodyDensity
        break
      case method == "Durnin & Womersley Woman": bodyDensity = this.utility.formulaDurninWomersleyWoman(sum, age).bodyDensity
        break
    }

    let bodyFatPerc: number = ((4.95 / bodyDensity) - 4.5) * 100
    let fatMass: number = (weight / 100) * bodyFatPerc
    let leanMass = weight - fatMass
    return { bodyDensity, bodyFatPerc, sum, fatMass, leanMass, foldSkinValueArray, foldSkinTitleArray, weight, method, date }
  }


  saveSkinfoldToDB(method: string, date: Date, weight: number, age: number) {

    let skinfoldToDB = this.skinfoldTransformDataForDB()
    skinfoldToDB.metadata = { method: method, date: date, weight: weight, age: age }
    console.log(age)

    this.dummy.dummyArrayCaliper.push(skinfoldToDB)
  }



}
