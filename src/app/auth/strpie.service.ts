import { stripeInfoGC } from './../interface-model/stripeInfoG_C';
import { CheckoutSessionConnectedAccount } from './../interface-model/checkout-Session.model';
// import { environment } from '../../enviroments/environment.prod';
import { filter, first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CheckoutSession } from '../interface-model/checkout-Session.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const Stripe

@Injectable({
  providedIn: 'root'
})
export class StrpieService {
  private jwtAuth: string

  constructor(private http: HttpClient,
    private authService: AuthService,
    private afs: AngularFirestore) {
    authService.returnUserIdToken().subscribe(jwt => this.jwtAuth = jwt);
  }

  startSubscriptionCheckoutSession(pricingPlanId: string): Observable<CheckoutSession> {
    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)
    return this.http.post<CheckoutSession>("/api/checkout", {
      //  return this.http.post<CheckoutSession> (environment.api.baseUrl + "/api/checkout", {
      pricingPlanId,
      end: true,
      callbackUrl: this.buildCallcackURL("/stripe-checkout")
    }, { headers })
  }

  startCheckoutConnectedAccount(
    stripeAccountTrainer: string,
    productName: string,
    productPrice: string
  ): Observable<CheckoutSessionConnectedAccount> {
    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)
    return this.http.post<CheckoutSessionConnectedAccount>("/api/checkoutConnectedAccount", {
      //  return this.http.post<CheckoutSession> (environment.api.baseUrl + "/api/checkout", {
      stripeAccountTrainer,
      productName,
      productPrice,
      callbackUrl: this.buildCallcackURL("/trainer/trainerBio")
    }, { headers })
  }

  trainerCreateStripeAccount(athleteAdmission: string): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)
    return this.http.post("/api/account-link", {
      athleteAdmission,
      callbackUrl: this.buildCallcackURL("/stripe-checkout")
    }, { headers })
  }

  trainerUdateStripeAccount(stripeAccountTrainer: string): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)
    return this.http.post("/api/account-update", {
      stripeAccountTrainer,
      callbackUrl: this.buildCallcackURL("/stripe-checkout")
    }, { headers })
  }

  trainerRetreiveStripeAccount(stripeAccountTrainer: string): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)
    return this.http.post("/api/account-retreive", {
      stripeAccountTrainer
    }, { headers })
  }

  subscripitonUnsubscription(cancelAtPeriodEnd: boolean, subscriptionId: string, isDeleteSubscription, deleteSubscription, stripeInfoGC: stripeInfoGC): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)

    return this.http.post("/api/subscripitonUnsubscription", {
      // return this.http.post(environment.api.baseUrl + "/api/subscripitonUnsubscription", {
      isDeleteSubscription: isDeleteSubscription,
      cancelAtPeriodEnd: cancelAtPeriodEnd,
      deleteSubscription: deleteSubscription,
      subscriptionId,
      stripeInfoGC
    }, { headers })
  }

  buildCallcackURL(callBackURL: string) {
    const protocol = window.location.protocol,
      hostname = window.location.hostname,
      port = window.location.port
    let callBackUrl = `${protocol}//${hostname}`
    if (port) {
      callBackUrl += ":" + port
    }
    callBackUrl += callBackURL
    return callBackUrl
  }

  redirectToCheckout(session: CheckoutSession) {
    const stripe = Stripe(session.stripePublicKey)
    stripe.redirectToCheckout({
      sessionId: session.stripeCheckoutSessionId
    })
  }
  redirectToCheckout2(session: CheckoutSessionConnectedAccount) {
    console.log("session c c");
    console.log(session);
    const stripe = Stripe(session.stripePublicKey, {
      stripeAccount: session.account_id
    });
    stripe.redirectToCheckout({
      sessionId: session.stripeCheckoutSessionId
    })
  }




  waitForPurchaseCompleted(ongoingPurchaseSessionId: string): Observable<any> {
    return this.afs.doc<any>(`users/${ongoingPurchaseSessionId}`)
      .valueChanges()
      .pipe(
        filter(purchase => (purchase.stripeInfoGC.status == "completed")),
        first(),
      )
  }

  waitForConnectedAccountCompleted(ongoingPurchaseSessionId: string): Observable<any> {
    return this.afs.doc<any>(`users/${ongoingPurchaseSessionId}`)
      .valueChanges()
      .pipe(
        filter(purchase => (purchase)),
        first(),
      )
  }


}
