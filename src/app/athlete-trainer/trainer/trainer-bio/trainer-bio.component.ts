import { Trainer, PublicInfo } from './../../../interface-model/Interface';
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
  userType: UserType<Trainer>
  trainer: Trainer
  unsub: Subscription
  accountJson: Observable<any>
  selectTarinerOption: string = 'fromGC'
  waiting = false
  trainerPageData$: Observable<TrainerPage>
  cataloguTemplateArray$: Observable<TrainerProduct[]>
  msg = "Admit Athlete to your team by purchasing one of your training";
  ngOnInit() {
    this.cataloguTemplateArray$ = this.fireDatabaseService.fetchAvailableTrainerProduct()
    this.trainerPageData$ = this.fireDatabaseService.fetchTrainerPage()

    this.authService.UserType$.pipe(
      map((user: UserType<Trainer>) => {

        this.userType = user

        if (user.profile.trainerStripeConnected) {
          this.accountJson = this.strpieService.trainerRetreiveStripeAccount(user.profile.trainerStripeConnected)
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

  publish(isPublished: boolean, id: string, page: TrainerPage) {
    isPublished = !isPublished
    this.fireDatabaseService.setTrainerPageAsPublished(id, isPublished)
    if (isPublished) {
      this.fireDatabaseService.publishTrainerPage(page)
    } else {
      this.fireDatabaseService.deletePublishedTrainerPage()
    }
  }

  publishp(page: TrainerPage) {
    this.fireDatabaseService.publishTrainerPage(page)
  }
  publishPublicInfo(isPublished: boolean, displayName?, companyName?, photoURL?, Email?, web?, address1?, zip_postalCode?, city?, country?, uid?) {

    isPublished = !isPublished

    let publicInfo: PublicInfo = {
      displayName: displayName,
      companyName: companyName,
      photoURL: photoURL,
      Email: Email,
      web: web,
      address1: address1,
      zip_postalCode: zip_postalCode,
      city: city,
      country: country,
      uid: uid,
      published: isPublished
    }

    this.fireDatabaseService.setTrainerContactsAsPublished(isPublished)
    if (isPublished) {
      this.fireDatabaseService.publishTrainerPublicInfo(publicInfo)
    } else {
      this.fireDatabaseService.deleteTrainerPublicInfo()

    }
  }


  onChange(value) {
    if (value.checked === true) {
      this.msg = "Athlete join your teamby purchasing one of your program";
      this.selectTarinerOption = "fromGC"
      this.fireDatabaseService.updateAthleteAdmission(this.selectTarinerOption)
    } else {
      this.msg = "Athlete join your the team only after your acceptance";
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
