import { logging } from 'protractor';
import { DummyDataService } from './../Utility/dummyData.service';
import { User } from './../interface-model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { Subject, of, Subscription, BehaviorSubject } from 'rxjs';
import { Girths } from './../interface-model/girths.model';
import { SkinfoldsForDB } from './../interface-model/skinfold.model';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/Operators';

import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {
  constructor(private dum: DummyDataService,
    private db: AngularFirestore,
    private authService: AuthService) {
    console.log("FireDatabaseService Constr")
    this.userSubscripiton = this.authService.user$.subscribe(user => {
      this.user = user
    })
  }
  user: User
  girthsSubj = new BehaviorSubject<Girths[]>([]);
  skinfoldsSubj = new Subject<SkinfoldsForDB[]>()
  userSubscripiton: Subscription


  addSkinfoldsToDB(skinfolds: SkinfoldsForDB) {
    this.db.collection(`users/${this.user.uid}/skinfoldsData`).add(skinfolds)
  }

  addGirthsToDB(girths: Girths) {
    this.db.collection(`users/${this.user.uid}/girthsData`).add(girths)
  }

  private fbSubs: Subscription[] = []

  fetchAvailableGirths() {
    this.fbSubs.push(this.db.collection<Girths>(`users/${this.user.uid}/girthsData`, ref => ref.orderBy("date", "desc").limit(10))
      .valueChanges()
      .pipe(
        map((girths, ref) => girths.map(girth => {
          return <Girths>{
            ...girth,
            date: new Date(girth.date.seconds * 1000)
          }
        }))
      ).subscribe((girths: Girths[]) => {
        this.girthsSubj.next(girths)
        console.log("EMESSO")
      }, error => {
        console.log("EMESSO IN CAZZO");

      }))
  }

  fetchAvailableSkinfolds() {
    this.fbSubs.push(this.db.collection<SkinfoldsForDB>(`users/${this.user.uid}/skinfoldsData`, ref => ref.orderBy("metadata.date", "asc").limit(10))//
      .valueChanges()
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
      }))
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  populateGirths() {
    this.db.firestore
      .collection('users')
      .doc(`${this.user.uid}`)
      .collection('girthsData')
      .limit(1)
      .get()
      .then(query => {
        if (query.size < 1) {
          for (let index = 0; index < 15; index++) {
            this.addGirthsToDB(this.dum.createGirth(index))

          }
        }
      });
  }

  populateSkinfolds() {
    this.db.firestore
      .collection('users')
      .doc(`${this.user.uid}`)
      .collection('skinfoldsData')
      .limit(1)
      .get()
      .then(query => {
        if (query.size < 1) {
          for (let index = 0; index < 15; index++) {
            this.addSkinfoldsToDB(this.dum.createSkinfold(index))
          }
        }
      });
  }

}
