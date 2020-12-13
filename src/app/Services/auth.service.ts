import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/Operators';

import firebase from 'firebase/app'

import { User } from './../interface-model/user.model';



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
          console.log("USER LOGGED")
          const userChanges = this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          return userChanges
        } else {
          console.log("USER NOT LOGGED")
          return of(null)
        }
      })
    )
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  cred: any
  arraOfLogin: string[] = []
  email: string
  emailSent = false;
  errorMessage: string;

  async facebookSignin() {
    let r: number = 0
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      const credential = await this.afAuth.signInWithPopup(provider)
      this.router.navigate(['Body&Measurements/girthTab'])
      console.log("PIPPO 1")
      return this.updateUserData(credential.user)
    } catch (err) {
      (await firebase.auth().fetchSignInMethodsForEmail(err.email)).map(async methods => {
        this.arraOfLogin.push(methods)
      })
      this.cred = err.credential
      this.router.navigate(['LoginRedirect'])
    }
  }

  async appleSignin() {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    const credential = await this.afAuth.signInWithPopup(provider)
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  async redirectWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    credential.user.linkWithCredential(this.cred)
    window.localStorage.removeItem('errorCred');
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  async redirectWithApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    const credential = await this.afAuth.signInWithPopup(provider)
    credential.user.linkWithCredential(this.cred)
    window.localStorage.removeItem('errorCred');
    this.router.navigate(['Body&Measurements/girthTab'])
    return this.updateUserData(credential.user)
  }

  actionCodeSettings = {
    url: 'http://localhost:4200/Signup/',
    handleCodeInApp: true,
  };

  async sendEmailLink(emailUser: string) {
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

  async confirmEmailFromURL(url) {
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
    return userRef.set(data, { merge: true })
  }

}
