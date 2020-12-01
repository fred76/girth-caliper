import { Subject } from 'rxjs';
import { Girths } from './../interface-model/girths.model';
import { SkinfoldsForDB } from './../interface-model/skinfold.model';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/Operators';

import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {


  constructor(private db: AngularFirestore) { }

  addSkinfoldsToDB(skinfolds: SkinfoldsForDB) {
    this.db.collection('skinfoldsData').add(skinfolds)
  }
  addGirthsToDB(girths: Girths) {
    this.db.collection('girthsData').add(girths)
  }
  dummyGirthsToDB(girths: Girths) {
    // if (this.db.collection('girthsData').doc.length == 0) {
    //   this.db.collection('girthsData').add(girths)
    // } else {
    //   this.db.collection('girthsData').add(girths)
    // }
  }
  dummySkinfoldsToDB(girths: Girths) {
    if (this.db.collection('skinfoldsData').doc.length == 0) {
    } else {
      this.db.collection('skinfoldsData').add(girths)
    }
  }

  girthsSubj = new Subject<Girths[]>();
  fetchAvailableGirths() {
    let girthsCollectionRef = this.db.collection<Girths>('girthsData', ref => ref.orderBy("date", "desc").limit(10))
    girthsCollectionRef.valueChanges()
      .pipe(
        map((girths, ref) => girths.map(girth => {
          return <Girths>{
            ...girth,
            date: new Date(girth.date.seconds * 1000)
          }
        }))
      ).subscribe((girths: Girths[]) => {
        this.girthsSubj.next(girths)
      }, error => {
      })
  }
  skinfoldsSubj = new Subject<SkinfoldsForDB[]>();
  fetchAvailableSkinfolds() {
    let skinfoldsCollectionRef = this.db.collection<SkinfoldsForDB>('skinfoldsData', ref => ref.orderBy("metadata.date", "asc").limit(10))//
    skinfoldsCollectionRef.valueChanges()
      .pipe(
        map((skinfolds, ref) => skinfolds.map(skinfold => {


          skinfold.metadata.date = new Date(skinfold.metadata.date.seconds * 1000)

          return <SkinfoldsForDB>{
            ...skinfold,

          }

        }))
      ).subscribe((skinfolds: SkinfoldsForDB[]) => {
        this.skinfoldsSubj.next(skinfolds)
      }, error => {
        console.log(error)
      })
  }
}
