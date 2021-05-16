import { UserImageLoaderComponent } from './user-image-loader/user-image-loader.component';
import { MatDialog } from '@angular/material/dialog';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { Trainer } from './../../interface-model/Interface';

import { Utility } from 'src/app/Utility/utility';
import { StrpieService } from './../strpie.service';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatStepper } from '@angular/material/stepper';
import { finalize, map } from 'rxjs/operators';
import { UserType } from 'src/app/interface-model/Interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true } }]
})

export class UserDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private strpieService: StrpieService,
    private utility: Utility,
    private fireDatabaseService: FireDatabaseService,
    private dialog: MatDialog,) {
    this.matIconRegistry.addSvgIcon(
      "appleL",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/accessory/appleL.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "googleL",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/accessory/googleL.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "facebookL",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/accessory/facebookL.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "email",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/accessory/email.svg")
    );
  }

  @ViewChild('stepper') stepper: MatStepper

  isLinear = false;
  genders: string[] = ["Male", "Female"]
  userSub: Subscription
  isLoggedIn: boolean = true
  isPurchaseStrated: boolean
  user: UserType<any>
  dueDate: boolean
  userCategorySelected: string
  routeLinkCustom: string = ""

  stripePrice = "price_1IpdmQBFHWy6VCCK19aaFXRj"

  subscriptionPlaneForUserCategories: { pricePlan: string, price: string, cadence: string }[]


  userDataFormGroup: FormGroup = new FormGroup({
    displayName: new FormControl('', Validators.required),
    nickname: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })

  trainerDataFormGroup: FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    address1: new FormControl('', Validators.required),
    address2: new FormControl(''),
    country: new FormControl('', Validators.required),
    state_province_region: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip_postalCode: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    emailBusiness: new FormControl('', [Validators.required, Validators.email]),
    web: new FormControl('')
  })

  openDialogImagePage() {
    const dialogRef = this.dialog.open(UserImageLoaderComponent, {
      data: {
      },
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.fireDatabaseService.updateUserPhoto(data)
        }
      }
    )
  }

  initUserDataFormGroup(u: UserType<any>) {

    this.userDataFormGroup.patchValue({
      displayName: u.displayName,
      nickname: u.nickname,
      dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth.seconds * 1000) : null,
      gender: u.gender,
    })
  }

  initTrainerDataFormGroup(u: UserType<Trainer>) {
    if (u.profile?.address) {
      this.trainerDataFormGroup.patchValue({
        companyName: u.profile.address?.companyName,
        address1: u.profile.address?.address1,
        address2: u.profile.address?.address2,
        country: u.profile.address?.country,
        state_province_region: u.profile.address?.state_province_region,
        city: u.profile.address?.city,
        zip_postalCode: u.profile.address?.zip_postalCode,
        phone: u.profile.address?.phone,
        mobile: u.profile.address?.mobile,
        emailBusiness: u.profile.address?.emailBusiness,
        web: u.profile.address?.web,
      })
    }
  }

  ngOnInit() {
    this.userSub = this.authService.UserType$.pipe(
      map(p => {
        this.initUserDataFormGroup(p),
          this.initTrainerDataFormGroup(p),
          this.authService.userProvidersList(p.email)
        this.user = p
        this.isLoggedIn = true
        this.userCategorySelected = p.profile?.userCategory

        if (this.userCategorySelected === "trainer") {

          this.routeLinkCustom = "/Body&Measurements/trainer/trainerBio"
        } else {
          this.routeLinkCustom = "/Body&Measurements/girthTab"
        }
        this.seletctSubscriptionPlaneForUserCategory(p)

        if (p.stripeInfoGC !== undefined && p.stripeInfoGC.current_period_end) {
          this.dueDate = this.utility.isSubscripitionOutOfDate(p.stripeInfoGC.current_period_end)
        }

      })
    ).subscribe()
  }

  seletctSubscriptionPlaneForUserCategory(u: UserType<any>) {

    if (u.profile?.userCategory == "trainer") {
      this.subscriptionPlaneForUserCategories = [{ pricePlan: this.stripePrice, price: "112,22$", cadence: "Monthly" }, { pricePlan: this.stripePrice, price: "115,22$", cadence: "Quartely" }, { pricePlan: this.stripePrice, price: "118,22$", cadence: "Yearly" }]
    } else {
      this.subscriptionPlaneForUserCategories = [{ pricePlan: this.stripePrice, price: "2,22$", cadence: "Monthly" }, { pricePlan: this.stripePrice, price: "5,22$", cadence: "Quartely" }, { pricePlan: this.stripePrice, price: "8,22$", cadence: "Yearly" }]
    }
  }

  subscripitonUnsubscription(event: MatCheckboxChange) {
    this.strpieService.subscripitonUnsubscription(!event.checked, this.user.stripeInfoGC.subscriptionId, false, false, this.user.stripeInfoGC).subscribe(
      session => console.log(session),
      err => {
        console.log("Error creating checkout session", err);
        this.isPurchaseStrated = false;
      }
    )
  }

  ngAfterViewInit(): void {
    this.userSub = this.authService.UserType$.subscribe(u => {
      if (u.dateOfBirth && u.gender) {
        this.stepper.selectedIndex = 1
      } else {
        this.stepper.selectedIndex = 0
      }
    })
  }

  deleteSubscripiton() {
    this.strpieService.subscripitonUnsubscription(false, this.user.stripeInfoGC.subscriptionId, true, true, this.user.stripeInfoGC).subscribe(
      session => console.log(session),
      err => {
        console.log("Error creating checkout session", err);
        this.isPurchaseStrated = false;
      }
    )
  }

  monthlySubscription(event) {
    console.log(event);

    this.strpieService.startSubscriptionCheckoutSession(event)
      .pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          this.strpieService.redirectToCheckout(session)
        },
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      )
  }

  quarterlySubscription() {
    this.strpieService.startSubscriptionCheckoutSession(this.subscriptionPlaneForUserCategories[1].pricePlan)
      .subscribe(
        session => this.strpieService.redirectToCheckout(session),
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      )
  }

  yearlySubscription() {
    this.strpieService.startSubscriptionCheckoutSession(this.subscriptionPlaneForUserCategories[2].pricePlan)
      .subscribe(
        session => this.strpieService.redirectToCheckout(session),
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      )
  }

  googleUnlinkLink(event: MatCheckboxChange): void {
    this.authService.unlinkGoolge(event.checked)
  }

  facebookUnlinkLink(event: MatCheckboxChange): void {
    this.authService.unlinkFacebook(event.checked)
  }

  appleUnlinkLink(event: MatCheckboxChange): void {
    this.authService.unlinkApple(event.checked)
  }

  onSubmit() {
    const userInfo = this.getDirtyValues(this.userDataFormGroup)
    this.authService.addUserInfo(this.authService.userID, userInfo)

  }

  onValChange(value) {
    this.fireDatabaseService.setUserCategory(value)
    console.log(value)
  }
  getDirtyValues(form: any) {
    let dirtyValues = {};
    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });
    return dirtyValues;
  }
  onSubmitTrainerContacts() {
    const trainerContat = this.getDirtyValues(this.trainerDataFormGroup)
    this.authService.addTrainerContacts(this.authService.userID, trainerContat)
    this.fireDatabaseService.deleteTrainerPublicInfo()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
