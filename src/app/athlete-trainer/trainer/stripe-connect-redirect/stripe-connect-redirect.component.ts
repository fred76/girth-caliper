import { StrpieService } from './../../../auth/strpie.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stripe-connect-redirect',
  templateUrl: './stripe-connect-redirect.component.html',
  styleUrls: ['./stripe-connect-redirect.component.css']
})
export class StripeConnectRedirectComponent  implements OnInit, OnDestroy {

  message = "Waiting to be redirect...";
  waiting = true;
  unsub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private strpieService: StrpieService) {

  }

  ngOnInit() {

    const result = this.route.snapshot.queryParamMap.get("purchaseResult")

    if (result == "accountSuccess") {
      const ongoingPurchaseSessionId = this.route.snapshot.queryParamMap.get("ongoingPurchaseSessionId")
      console.log("ongoingPurchaseSessionIdongoingPurchaseSessionId");
      console.log(ongoingPurchaseSessionId);

      this.unsub = this.strpieService.waitForConnectedAccountCompleted(ongoingPurchaseSessionId)
        .subscribe(
          () => {
            this.waiting = true
            this.message = "Account Successful Created, redirecting ..."
            setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/trainerBio"), 3000);
          }
        )

    } else {
      this.waiting = false
      this.message = "Account Cancelled or Failed, redirecting ..."
      setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/athleteList"), 3000)
    }
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe()
  }

}
