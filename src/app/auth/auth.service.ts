import { Utility } from './../Utility/utility';
import { User } from './../interface-model/user.model';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/Operators';

import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>
  userID: string
  gender: string
  age: number
  cred: any
  arraOfLogin: string[] = []
  email: string
  emailSent = false;
  errorMessage: string;
  userPhoto: string
  providerId: string

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private utility: Utility
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userChanges = this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          this.userID = user.uid
          user.providerData.map(profile => {
            this.providerId = profile.providerId
          })
          return userChanges
        } else {
          console.log("No user");
          return of(null)
        }
      })
    )
  }

  returnUserIdToken(): Observable<string> {
    return this.afAuth.idToken
  }

  async userProvidersList(userEmail: string) {
    this.arraOfLogin = []
    const _ = (await firebase.auth().fetchSignInMethodsForEmail(userEmail)).map(async methods => {
      this.arraOfLogin.push(methods)
    })
  }



  isUserExtendedData(userId: string) {
    let isUserData: boolean = false
    this.afs.firestore
      .collection('users')
      .doc(`${userId}`).get().then(async p => {
        if (p.exists) {
          let birthday = p.get('dateOfBirth')
          let gender = p.get('gender')
          let subsDate = p.get('current_period_end') || new Date(0)
          if (!birthday || !gender || this.utility.isSubscripitionOutOfDate(subsDate)) {
            this.router.navigate(['UserDashboard'])
          } else {
            this.router.navigate(['Body&Measurements/girthTab'])
          }
        }
      })
  }


  actionCodeSettings = {
    url: 'http://localhost:4200/Signup/',
    handleCodeInApp: true,
  };

  addNickname(uid: string, nickname: string) {
    this.afs.collection<User>(`users`).doc(uid).update({ nickname: nickname })
  }
  addGiveName(uid: string, givenName: string) {
    this.afs.collection<User>(`users`).doc(uid).update({ givenName: givenName })
    this.afs.collection<User>(`users`).doc(uid).update({ displayName: givenName })
  }
  addGender(uid: string, gender: string) {
    this.afs.collection<User>(`users`).doc(uid).update({ gender: gender })
  }
  addDateOfBirth(uid: string, dateOfBirth: string) {
    this.afs.collection<User>(`users`).doc(uid).update({ dateOfBirth: dateOfBirth })
  }

  async googleSignup() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    const t = credential.user.uid
    this.isUserExtendedData(t)
    const providerData = credential.user.providerData
    let uid: string = ""
    let userName = ""
    let userPhoto = ""
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
        userName = providerData[i].displayName
        userPhoto = providerData[i].photoURL
      }
    }
    return this.updateUserDataFB(credential.user, userName, userPhoto)

  }

  async facebookSignup() {
    this.arraOfLogin = []
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      const credential = await this.afAuth.signInWithPopup(provider)
      const providerData = credential.user.providerData
      let uid: string = ""
      let userName = ""
      let userPhoto = ""
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
          uid = providerData[i].uid
          userName = providerData[i].displayName
        }
      }
      const accessToken = (<any>credential).credential.accessToken
      userPhoto = "https://graph.facebook.com/" + uid + "/picture?width=800&access_token=" + accessToken
      const t = credential.user.uid
      this.isUserExtendedData(t)
      return this.updateUserDataFB(credential.user, userName, userPhoto)
    } catch (err) {
      (await firebase.auth().fetchSignInMethodsForEmail(err.email)).map(async methods => {
        this.arraOfLogin.push(methods)
      })
      this.cred = err.credential
      this.router.navigate(['LoginRedirect'])
    }
  }

  async appleSignup() {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    const credential = await this.afAuth.signInWithPopup(provider)
    const t = credential.user.uid
    this.isUserExtendedData(t)
    return this.updateUserData(credential.user, credential.additionalUserInfo.isNewUser, false)
  }

  async redirectWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    credential.user.linkWithCredential(this.cred)
    const t = credential.user.uid
    this.isUserExtendedData(t)
    return this.updateUserData(credential.user, credential.additionalUserInfo.isNewUser, true)

  }

  async redirectWithApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    const credential = await this.afAuth.signInWithPopup(provider)
    credential.user.linkWithCredential(this.cred)
    const t = credential.user.uid
    this.isUserExtendedData(t)
    return this.updateUserData(credential.user, credential.additionalUserInfo.isNewUser, false)

  }

  async sendEmailLinkToSignup(emailUser: string) {
    this.email = emailUser
    const actionCodeSettings = {
      url: 'http://localhost:4200/Signup/',
      handleCodeInApp: true,
    }
    try {
      await this.afAuth.sendSignInLinkToEmail(
        emailUser,
        actionCodeSettings,
      );
      window.localStorage.setItem('emailForSignIn', emailUser);
      this.emailSent = true
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async confirmEmailFromURLToSignup(url) {
    let email = window.localStorage.getItem('emailForSignIn')
    try {
      if (this.afAuth.isSignInWithEmailLink(url)) {
        const credential = await this.afAuth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');
        const t = credential.user.uid
        this.isUserExtendedData(t)
        return this.updateUserData(credential.user, credential.additionalUserInfo.isNewUser, false)

        // this.router.navigate(['Body&Measurements/girthTab'])
        // return this.updateUserData(credential.user)
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async insertEmailFromURL(url, emailInserted) {
    try {
      if (this.afAuth.isSignInWithEmailLink(url)) {
        const credential = await this.afAuth.signInWithEmailLink(emailInserted, url);
        window.localStorage.removeItem('emailForSignIn');
        const t = credential.user.uid
        this.isUserExtendedData(t)
        return this.updateUserData(credential.user, credential.additionalUserInfo.isNewUser, false)
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async signOut() {
    this.afAuth.signOut()
    return this.router.navigate(['/'])
  }

  unlinkGoolge(isUncheked) {
    if (!isUncheked) {
      this.afAuth.currentUser.then(function (user) {
        user.unlink("google.com").then(function () {
        }).catch(function (error) {
          console.log(error);
        });
      })
    } else {
      this.googleSignup()
    }
  }

  unlinkFacebook(isUncheked) {
    if (!isUncheked) {
      this.afAuth.currentUser.then(function (user) {
        user.unlink("facebook.com").then(function () {
        }).catch(function (error) {
          console.log(error);
        });
      })
    } else {
      this.facebookSignup()
    }
  }

  unlinkApple(isUncheked) {
    if (!isUncheked) {
      this.afAuth.currentUser.then(function (user) {
        user.unlink("apple.com").then(function () {
        }).catch(function (error) {
          console.log(error);
        });
      })
    } else {
      this.appleSignup()
    }
  }

  unlinkEmail(isUncheked) {
    if (!isUncheked) {
      this.afAuth.currentUser.then(function (user) {
        user.unlink("emailLink").then(function () {
        }).catch(function (error) {
          console.log(error);
        });
      })
    } else {
      this.afAuth.currentUser.then(function (user) {
        this.sendEmailLinkToSignup(user.email)
      })

    }
  }



  private updateUserData({ uid, email, displayName, photoURL }: User, isNewUser: boolean, isProviderWithPhoto: boolean) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`)
    const data = { uid, email, displayName, photoURL }
    if (isNewUser || isProviderWithPhoto) {
      return userRef.set(data, { merge: true })
    }
  }

  private updateUserDataFB({ uid, email }: User, displayName, photoURL) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`)
    const data = { uid, email, displayName, photoURL }
    return userRef.set(data, { merge: true })
  }

}
/*
export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    stripeCustomerId?: string;
    subscriptions?: {
      [key: string]: 'active' | 'pastDue' | 'cancelled';
    }

    // for Stripe Connect
    accountId?: string;
    refreshToken?: string;
  }
*/
