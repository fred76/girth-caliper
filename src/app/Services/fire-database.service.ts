
import { PhotoSession } from './../interface-model/photo-user';
import { DummyDataService } from './../Utility/dummyData.service';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription, Observable, from } from 'rxjs';
import { Girths } from './../interface-model/girths.model';
import { SkinfoldsForDB } from './../interface-model/skinfold.model';
import { Injectable } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FireDatabaseService {
  constructor(
    private dum: DummyDataService,
    private afs: AngularFirestore,
    private authService: AuthService) { }

  private fbSubs: Subscription[] = []

  girthsSubj = new Subject<Girths[]>();
  skinfoldsSubj = new Subject<SkinfoldsForDB[]>()
  userSubscripiton: Subscription

  addSkinfoldsToDB(skinfolds: SkinfoldsForDB) {
    this.afs.collection(`users/${this.authService.userID}/skinfoldsData`).add(skinfolds)
  }

  addGirthsToDB(girths: Girths) {
    this.afs.collection(`users/${this.authService.userID}/girthsData`).add(girths)
  }


  addPhoto2(photoSet: PhotoSession): Observable<any> {

    return from(this.afs.collection(`users/${this.authService.userID}/bodyPhotos`).add(photoSet))
  }

  addImageCataloguURL(photoSet: string): Observable<any> {
    console.log(photoSet, "KSKKSmmmmcmcmcmmcmcmcmc");

    return from(this.afs.collection(`users/${this.authService.userID}/bodyPhotos`).add(photoSet))
  }

  fetchAvailablePhoto(n: number) {
    return this.afs.collection<PhotoSession>(`users/${this.authService.userID}/bodyPhotos`, ref => ref.orderBy("date", "asc").limit(12 + n))
      .valueChanges({ idField: 'idField' })
  }

  fetchAvailableGirths(n: number) {
    this.fbSubs.push(this.afs.collection<Girths>(`users/${this.authService.userID}/girthsData`, ref => ref.orderBy("date", "desc").limit(5 + n))
      .valueChanges({ idField: 'idField' })
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
      }))
  }

  fetchAvailableSkinfolds(n: number) {
    this.fbSubs.push(this.afs.collection<SkinfoldsForDB>(`users/${this.authService.userID}/skinfoldsData`, ref => ref.orderBy("metadata.date", "desc").limit(5 + n))//
      .valueChanges({ idField: 'idField' })
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
      }))
  }

  deleteGirth(id: string) {
    this.afs.collection<Girths>(`users/${this.authService.userID}/girthsData`).doc(id).delete()
  }

  deleteSkinfolds(id: string) {
    this.afs.collection<SkinfoldsForDB>(`users/${this.authService.userID}/skinfoldsData`).doc(id).delete()
  }
  deletePhotoSet(id: string) {
    this.afs.collection<SkinfoldsForDB>(`users/${this.authService.userID}/bodyPhotos`).doc(id).delete()
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  populateGirths() {
    this.afs.firestore
      .collection('users')
      .doc(`${this.authService.userID}`)
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
    this.afs.firestore
      .collection('users')
      .doc(`${this.authService.userID}`)
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

