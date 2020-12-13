import { User } from './../interface-model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { Subject, of, Subscription } from 'rxjs';
import { Girths } from './../interface-model/girths.model';
import { SkinfoldsForDB } from './../interface-model/skinfold.model';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/Operators';

import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {
  user: User
  constructor(private db: AngularFirestore, private authService: AuthService,
    private afAuth: AngularFireAuth) {
    this.userSubscripiton = this.authService.user$.subscribe(user => {
      this.user = user
    })
  }

  girthsSubj = new Subject<Girths[]>();
  skinfoldsSubj = new Subject<SkinfoldsForDB[]>()

  userSubscripiton: Subscription

  userUnsubscripiton() {
    this.userSubscripiton.unsubscribe()
  }

  addSkinfoldsToDB(skinfolds: SkinfoldsForDB) {
    this.db.collection(`users/${this.user.uid}/skinfoldsData`).add(skinfolds)
  }

  addGirthsToDB(girths: Girths) {
    this.db.collection(`users/${this.user.uid}/girthsData`).add(girths)
  }

  dummyGirthsToDB(girths: Girths) {
    //  this.db.collection(`user/${this.authService.userID}/girthsData`).add(girths)
  }

  dummySkinfoldsToDB(skinfolds: SkinfoldsForDB) {
    //this.db.collection(`user/${this.authService.userID}/skinfoldsData`).add(skinfolds)
  }

  fetchAvailableGirths() {
    let girthsCollectionRef = this.db.collection<Girths>(`users/${this.user.uid}/girthsData`, ref => ref.orderBy("date", "desc").limit(10))
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

  fetchAvailableSkinfolds() {
    let skinfoldsCollectionRef = this.db.collection<SkinfoldsForDB>(`users/${this.user.uid}/skinfoldsData`, ref => ref.orderBy("metadata.date", "asc").limit(10))//
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
