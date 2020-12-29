import { AuthService } from './auth.service';
import { checkoutSession } from '../interface-model/checkout-Session.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const Stripe

@Injectable({
  providedIn: 'root'
})
export class StrpieService {

  private jwtAuth: string
  constructor(private http: HttpClient, private authService : AuthService) {
    authService.returnUserIdToken().subscribe(jwt =>{ this.jwtAuth = jwt, console.log("headers sss" + jwt) });
  }

  startCheckoutSession(courseID: string): Observable<checkoutSession> {

    const headers = new HttpHeaders().set("Authorization", this.jwtAuth)
console.log("headers " + headers);

    return this.http.post<checkoutSession>("/api/checkout", {
      courseID,
      callbackUrl: this.buildCallcackURL()
    }, {headers})
  }

  buildCallcackURL() {
    const protocol = window.location.protocol,
      hostname = window.location.hostname,
      port = window.location.port

    let callBackUrl = `${protocol}//${hostname}`

    console.log(callBackUrl);

    if (port) {
      callBackUrl += ":" + port
    }

    callBackUrl += "/stripe-checkout"
    return callBackUrl

  }

  redirectToCheckout(session: checkoutSession) {
console.log("ENTRO");

const stripe = Stripe(session.stripePublicKey)

console.log("ENTRO 2 ");
stripe.redirectToCheckout({

      sessionId: session.stripeCheckoutSessionId
    })
console.log("ENTRO 3 ");
  }

}
