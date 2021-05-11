import { Trainer } from './../../../interface-model/Interface';
import { TrainerPage, TrainerProduct } from './../../../interface-model/trainer';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
// import { Trainer } from '../../../interface-model/trainer';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, switchMap, filter } from 'rxjs/operators';
import { StrpieService } from '../../../auth/strpie.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { User } from 'src/app/interface-model/user.model';
import { Observable, Subscription } from 'rxjs';
import { UserType } from 'src/app/interface-model/Interface';

@Component({
  selector: 'app-trainer-bio',
  templateUrl: './trainer-bio.component.html',
  styleUrls: ['./trainer-bio.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class TrainerBioComponent implements OnInit {

  constructor(
    private strpieService: StrpieService,
    public authService: AuthService,
    private fireDatabaseService: FireDatabaseService) { }

  message = "Waiting for purchase to complete...";

  showStripe = false
  // user: User
  userType: UserType<Trainer>
  isTrainerStripeConnected: boolean = false
  trainer: Trainer
  unsub: Subscription
  accountJson: Observable<any>
  selectTarinerOption: string = 'fromGC'
  waiting = false
  trainerPageData$: Observable<TrainerPage>
  cataloguTemplateArray$: Observable<TrainerProduct[]>
  msg = "Admit Athlete to your team by purchasing one of your training";
pppp : any
  ngOnInit() {
    this.cataloguTemplateArray$ = this.fireDatabaseService.fetchAvailableTrainerProduct()
    this.trainerPageData$ = this.fireDatabaseService.fetchTrainerPage()

    this.authService.UserType$.pipe(
      map((user: UserType<Trainer>) => {

        this.userType = user

        if (user.profile.trainerStripeConnected) {
          this.isTrainerStripeConnected = true
          this.accountJson = this.strpieService.trainerRetreiveStripeAccount(user.profile.trainerStripeConnected)
          this.accountJson.subscribe(p => (console.log(p.account.charges_enabled),
          console.log(p), this.pppp = p)

          )
        }
        if (user.profile.athleteAdmission) {
          this.selectTarinerOption = user.profile.athleteAdmission
        }
      })
    ).subscribe()
    // this.authService.user$.pipe(
    //   map(user => {
    //     this.user = user
    //     if (user.trainerStripeConnected) {
    //       this.isTrainerStripeConnected = true
    //       this.accountJson = this.strpieService.trainerRetreiveStripeAccount(user.trainerStripeConnected)
    //       this.accountJson.subscribe(p => console.log(p)
    //       )
    //     }
    //     if (user.trainer) {
    //       this.selectTarinerOption = user.trainer.athleteAdmission
    //     }
    //   })
    // ).subscribe()

    // const result = this.route.snapshot.queryParamMap.get("purchaseResult")


    // if (result == "success") {
    //   const ongoingPurchaseSessionId = this.route.snapshot.queryParamMap.get("ongoingPurchaseSessionId")
    //   this.unsub = this.strpieService.waitForPurchaseCompleted(ongoingPurchaseSessionId)
    //     .subscribe(
    //       () => {
    //         this.waiting = true
    //         console.log("entro");

    //         setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/trainerBio"), 3000);
    //       }
    //     )
    // } else {
    //   this.waiting = true
    //   console.log("esco");

    //   setTimeout(() => this.router.navigateByUrl("/Body&Measurements/trainer/athleteList"), 3000)
    // }


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

  publish(isPublished: boolean, id: string) {
    isPublished = !isPublished
    console.log(isPublished);

    this.fireDatabaseService.publish(id, isPublished)
  }


  onChange(value) {
    if (value.checked === true) {
      this.msg = "Admit athlete to your team by purchasing one of your training";
      this.selectTarinerOption = "fromGC"
      this.fireDatabaseService.updateAthleteAdmission(this.selectTarinerOption)
    } else {
      this.msg = "Athlete can join the team only after your acceptance";
      this.selectTarinerOption = "withContact"
      this.fireDatabaseService.updateAthleteAdmission(this.selectTarinerOption)
    }
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
