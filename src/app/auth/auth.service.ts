import { logging } from 'protractor';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/Operators';

import firebase from 'firebase/app'

import { User } from '../interface-model/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userChanges = this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          this.userID = user.uid
          return userChanges
        } else {
          return of(null)
        }
      })
    )
  }

  async googleSignkup() {
    this.userPhoto = ""
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  userID: string
  cred: any
  arraOfLogin: string[] = []
  email: string
  emailSent = false;
  errorMessage: string;
  userPhoto: string

  actionCodeSettings = {
    url: 'http://localhost:4200/Signup/',
    handleCodeInApp: true,
  };

  async facebookSignup() {
    let r: number = 0
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      const credential = await this.afAuth.signInWithPopup(provider)
      const providerData = credential.user.providerData
      let uid: string = ""
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
          uid = providerData[i].uid
        }
      }
      const accessToken = (<any>credential).credential.accessToken
      this.userPhoto = "https://graph.facebook.com/" + uid + "/picture?width=800&access_token=" + accessToken
      this.router.navigate(['Body&Measurements/girthTab'])
      return this.updateUserData(credential.user)
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
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  async redirectWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    credential.user.linkWithCredential(this.cred)
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  async redirectWithApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    const credential = await this.afAuth.signInWithPopup(provider)
    credential.user.linkWithCredential(this.cred)
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
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
        this.router.navigate(['Body&Measurements/girthTab'])
        return this.updateUserData(credential.user)
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async insertEmailFromURL(url, emailInserted) {
    try {
      if (this.afAuth.isSignInWithEmailLink(url)) {
        const credential = await this.afAuth.signInWithEmailLink(emailInserted, url);
        this.router.navigate(['Body&Measurements/girthTab'])
        window.localStorage.removeItem('emailForSignIn');
        return this.updateUserData(credential.user)
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async signOut() {
    this.afAuth.signOut()
    return this.router.navigate(['/'])
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    if (this.userPhoto) {
      data.photoURL = this.userPhoto
    }
    return userRef.set(data, { merge: true })
  }

}
