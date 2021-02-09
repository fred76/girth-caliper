import { Subscription } from 'rxjs';
import { StrpieService } from './../strpie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})
export class StripeCheckoutComponent implements OnInit, OnDestroy {

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
    if (result == "success") {
      const ongoingPurchaseSessionId = this.route.snapshot.queryParamMap.get("ongoingPurchaseSessionId")
      this.unsub = this.strpieService.waitForPurchaseCompleted(ongoingPurchaseSessionId)
        .subscribe(
          () => {
            this.waiting = true
            this.message = "Purchase Successful, redirecting ..."
            setTimeout(() => this.router.navigateByUrl("/Body&Measurements/girthTab"), 3000);
          }
        )

    } else {
      this.waiting = false
      this.message = "Purchase Cancelled or Failed, redirecting ..."
      setTimeout(() => this.router.navigateByUrl("/"), 3000)
    }

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
      setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/trainerBio"), 3000)
    }
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe()
  }

}
