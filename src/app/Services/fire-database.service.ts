import { Trainer, PublicInfo } from './../interface-model/Interface';
import { UserType } from 'src/app/interface-model/Interface';
import { TrainerPage, TrainerProduct } from './../interface-model/trainer';

import { PhotoSession } from './../interface-model/photo-user';
import { DummyDataService } from './../Utility/dummyData.service';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription, Observable, from } from 'rxjs';
import { Girths } from './../interface-model/girths.model';
import { SkinfoldsForDB } from './../interface-model/skinfold.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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
  trainerProductSubj = new Subject<TrainerProduct[]>();
  skinfoldsSubj = new Subject<SkinfoldsForDB[]>()
  userSubscripiton: Subscription

  // ATHLETE

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
        map((girths) => girths.map(girth => {
          return <Girths>{
            ...girth,
            date: new Date(girth.date.seconds * 1000)
          }
        }))
      ).subscribe((girths: Girths[]) => {
        this.girthsSubj.next(girths)
      }, error => {
        console.log(error);

      }))
  }

  fetchAvailableSkinfolds(n: number) {
    this.fbSubs.push(this.afs.collection<SkinfoldsForDB>(`users/${this.authService.userID}/skinfoldsData`, ref => ref.orderBy("metadata.date", "desc").limit(5 + n))//
      .valueChanges({ idField: 'idField' })
      .pipe(
        map((skinfolds) => skinfolds.map(skinfold => {
          skinfold.metadata.date = new Date(skinfold.metadata.date.seconds * 1000)
          return <SkinfoldsForDB>{
            ...skinfold,
          }
        }))
      ).subscribe((skinfolds: SkinfoldsForDB[]) => {
        this.skinfoldsSubj.next(skinfolds)
      }, error => {
        console.log(error);

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

  // ATHLETE / TRAINER

  updateUserPhoto(data) {
    const userRef = this.afs.doc(`users/${this.authService.userID}`);
    userRef.set(data, { merge: true })
  }

  setUserCategory(userCategory: string) {
    const userRef = this.afs.doc(`users/${this.authService.userID}`);
    userRef.set({ profile: { userCategory: userCategory } }, { merge: true })
  }

  // TRAINER

  // TRAINER PAGE

  createTrainerPage(trainerPage: TrainerPage) {
    this.afs.collection(`users/${this.authService.userID}/trainerPage`).add(trainerPage)
  }

  editTrainerPage(trainerPage: TrainerPage, id) {
    this.deletePublishedTrainerPage()
    this.afs.doc(`users/${this.authService.userID}/trainerPage/${id}`).update(trainerPage)
  }

  deleteTrainerProduct(id: string) {
    this.afs.collection<TrainerProduct>(`users/${this.authService.userID}/trainerProduct`).doc(id).delete()
  }

  fetchTrainerPage(): Observable<TrainerPage> {
    const collection = this.afs.collection<TrainerPage>(`users/${this.authService.userID}/trainerPage`)
    const trainerPage$ = collection
      .valueChanges({ idField: 'idField' })
      .pipe(
        map(trainerPage => {
          const trainerPage2 = trainerPage[0];
          return trainerPage2;
        })
      );

    return trainerPage$;
  }

  setTrainerPageAsPublished(id, isPublished: boolean) {
    this.afs.doc(`users/${this.authService.userID}/trainerPage/${id}`).update({ published: isPublished })
  }

  // TRAINER PRODUCT

  createTrainerProduct(trainerProduct: TrainerProduct) {
    this.afs.collection(`users/${this.authService.userID}/trainerProduct`).add(trainerProduct)
  }

  editTrainerProduct(trainerProduct: TrainerProduct, id) {
    this.afs.doc(`users/${this.authService.userID}/trainerProduct/${id}`).update(trainerProduct)
  }

  fetchAvailableTrainerProduct(): Observable<TrainerProduct[]> {
    return from(this.afs.collection<TrainerProduct>(`users/${this.authService.userID}/trainerProduct`)
      .valueChanges({ idField: 'idField' })
      .pipe(
        map((trainerProducts) => trainerProducts.map(trainerProduct => {
          return <TrainerProduct>{
            ...trainerProduct,
            date: new Date(trainerProduct.cratedON.seconds * 1000)
          }
        }))
      ))
  }

  // TRAINER CONTACTS

  setTrainerContactsAsPublished(isPublished: boolean) {
    console.log(isPublished);

    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${this.authService.userID}`)
    console.log(userRef);

    return userRef.set({ profile: { address: { published: isPublished } } }, { merge: true })
  }

  // USER FOR TRAINER

  fetchAvailableTrainerProductFromAthlete(userID: string): Observable<TrainerProduct[]> {
    return from(this.afs.collection<TrainerProduct>(`users/${userID}/trainerProduct`)
      .valueChanges({ idField: 'idField' })
      .pipe(
        map((trainerProducts) => trainerProducts.map(trainerProduct => {
          return <TrainerProduct>{
            ...trainerProduct,
            date: new Date(trainerProduct.cratedON.seconds * 1000)
          }
        }))
      ))
  }

  fetchAvailableUser(): Observable<UserType<Trainer>[]> {
    return from(this.afs.collection<UserType<Trainer>>(`users`)
      .valueChanges({ idField: 'idField' })
      .pipe(
        map((users) => users.map(users => {
          return <UserType<Trainer>>{
            ...users,
          }
        }))
      ))
  }

  // TRAINER FOR USER

  updateAthleteAdmission(thleteAdmission: string) {
    const userRef = this.afs.doc(`users/${this.authService.userID}`);
    userRef.set({ profile: { athleteAdmission: thleteAdmission } }, { merge: true })
  }

  fetchAvailableTrainer(): Observable<UserType<Trainer>[]> {
    return from(this.afs.collection<UserType<Trainer>>(`users`, ref => ref.where("profile.userCategory", "==", "trainer"))
      .valueChanges({ idField: 'idField' })
      .pipe(
        map((trainerProducts) => trainerProducts.map(trainerProduct => {
          return <UserType<Trainer>>{
            ...trainerProduct,
          }
        }))
      ))
  }

  publishTrainerPublicInfo(publicInfo: PublicInfo) {
    this.afs.collection("trainerInfo").doc(publicInfo.uid).collection("info").doc("publicInfo").set(publicInfo)
  }

  publishTrainerPage(trainerPage: TrainerPage) {
    trainerPage.published = true
    this.afs.collection("trainerInfo").doc(this.authService.userID).collection("info").doc("trainerPage").set(trainerPage)
  }

  deletePublishedTrainerPage() {
    this.afs.collection("trainerInfo").doc(this.authService.userID).collection("info").doc("trainerPage").delete()
  }

  deleteTrainerPublicInfo() {
    this.afs.collection("trainerInfo").doc(this.authService.userID).collection("info").doc("publicInfo").delete()
  }

  fetchTrainerPageFromAthlete(userID: string): Observable<TrainerPage> {
    const collection = this.afs.collection<TrainerPage>(`users/${userID}/trainerPage`)
    const trainerPage$ = collection
      .valueChanges({ idField: 'idField' })
      .pipe(
        map(trainerPage => {
          const trainerPage2 = trainerPage[0];
          return trainerPage2;
        })
      );

    return trainerPage$;
  }

  fetchTrainerPublicInfo(userID: string): Observable<PublicInfo> {
    const collection = this.afs.collection<PublicInfo>(`users/${userID}/publicInfo`)
    const PublicInfo$ = collection
      .valueChanges({ idField: 'idField' })
      .pipe(
        map(PublicInfo => {
          const PublicInfo2 = PublicInfo[0];
          return PublicInfo2;
        })
      );
    return PublicInfo$;
  }

}

