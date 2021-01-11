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

  message = "Waiting for purchase to complete...";
  waiting = true;
  unsub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private strpieService: StrpieService) {

  }

  ngOnInit() {

    const reuslt = this.route.snapshot.queryParamMap.get("purchaseResult")
    if (reuslt == "success") {
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
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe()
  }

}
