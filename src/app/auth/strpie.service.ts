import { filter, first, map } from 'rxjs/Operators';
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
      pricingPlanId,
      callbackUrl: this.buildCallcackURL()
    }, { headers })
  }

  buildCallcackURL() {
    const protocol = window.location.protocol,
      hostname = window.location.hostname,
      port = window.location.port
    let callBackUrl = `${protocol}//${hostname}`
    if (port) {
      callBackUrl += ":" + port
    }
    callBackUrl += "/stripe-checkout"
    return callBackUrl
  }

  redirectToCheckout(session: CheckoutSession) {
    const stripe = Stripe(session.stripePublicKey)
    stripe.redirectToCheckout({
      sessionId: session.stripeCheckoutSessionId
    })
  }

  waitForPurchaseCompleted(ongoingPurchaseSessionId: string): Observable<any> {
    return this.afs.doc<any>(`users/${ongoingPurchaseSessionId}`)
      .valueChanges()
      .pipe(
        filter(purchase => (purchase.status == "completed")),
        first(),
      )
  }


}
