import { Trainer } from './../../../interface-model/trainer';
import { AuthService } from './../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, filter, find } from 'rxjs/operators';
import { StrpieService } from './../../../auth/strpie.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/interface-model/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-trainer-bio',
  templateUrl: './trainer-bio.component.html',
  styleUrls: ['./trainer-bio.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class TrainerBioComponent implements OnInit {

  constructor(
    public strpieService: StrpieService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService) { }

  message = "Waiting for purchase to complete...";

  showStripe = false
  user: User
  unsub: Subscription
  accountJson: Observable<any>
  selectTarinerOption: string
  waiting = false
  ngOnInit() {

    this.authService.user$.pipe(
      map(user => {
        this.user = user
        if (user.trainerStripeConnected) {
          this.accountJson = this.strpieService.trainerRetreiveStripeAccount(user.trainerStripeConnected)
          this.strpieService.trainerRetreiveStripeAccount(user.trainerStripeConnected).subscribe(p => console.log(p))
        }
        if (user.trainer) {
          this.selectTarinerOption = user.trainer.athleteAdmission
        }

      })
    ).subscribe()

    const result = this.route.snapshot.queryParamMap.get("purchaseResult")
    if (result == "success") {
      const ongoingPurchaseSessionId = this.route.snapshot.queryParamMap.get("ongoingPurchaseSessionId")
      this.unsub = this.strpieService.waitForPurchaseCompleted(ongoingPurchaseSessionId)
        .subscribe(
          () => {
            this.waiting = true
            setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/trainerBio"), 3000);
          }
        )
    } else {
      this.waiting = true
      setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/trainerBio"), 3000)
    }


    // da usare athlete checkout
    // const result = this.route.snapshot.queryParamMap.get("trainerCreation")
    // if (result == "success") {
    //   const ongoingPurchaseSessionId = this.route.snapshot.queryParamMap.get("ongoingTrainerSessionId")
    //   this.strpieService.waitForPurchaseCompleted(ongoingPurchaseSessionId)
    //     .subscribe(
    //       () => {
    //         this.message = "Purchase Successful, redirecting ..."
    //       }
    //     )
    // } else {
    //   this.message = "Purchase Cancelled or Failed, redirecting ..."
    // }
  }


  updateAccount(accountID: string) {
    this.strpieService.trainerUdateStripeAccount(accountID).pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          document.location.href = session.url
        },
        err => {
          console.log("Error createConnectedAccountSession", err);
        },
      )
  }


  setTarinerOption() {
    this.showStripe = true
    console.log(this.selectTarinerOption)

  }

  trainerCreateStripeAccount() {
    this.strpieService.trainerCreateStripeAccount(this.selectTarinerOption).pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          document.location.href = session.url
        },
        err => {
          console.log("Error createConnectedAccountSession", err);
        },
      )
  }
  redir(trainerStripeConnected) {

  }

  paga() {
    this.strpieService.startCheckoutConnectedAccount('acct_1IHyj0K4NHDpWWQY', 'DDDD', 'DCCCC').pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          this.strpieService.redirectToCheckout2(session)

        },
        err => {
          console.log("Error createConnectedAccountSession", err);
        },
      )
  }




}
