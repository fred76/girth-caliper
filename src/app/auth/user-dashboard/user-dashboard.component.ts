import { AddressContact } from './../../interface-model/athlete';
import { Utility } from 'src/app/Utility/utility';
import { User } from './../../interface-model/user.model';
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
import { finalize, switchMapTo, map } from 'rxjs/operators';

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
    private utility: Utility) {
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
  user: User
  dueDate: boolean
  selectUserTypeId: any;


  userTypes: any[] = [
    { name: "I'm an Athlete", id: 1 },
    { name: "I'm a Trainer", id: 2 }
  ];

  subscriptionPlaneForUserCategories: { pricePlan: string, price: string, cadence: string }[]

  selectUserTypes(userTypes) {
    this.selectUserTypeId = userTypes.id
  }

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

  initUserDataFormGroup(u: User) {
    console.log("eeeeeee");
    console.log(u);

    this.userDataFormGroup.patchValue({
      displayName: u.displayName,
      nickname: u.nickname,
      dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth.seconds * 1000) : null,
      gender: u.gender,
    })
  }

  initTrainerDataFormGroup(u: User) {

    this.trainerDataFormGroup.patchValue({
      companyName: u.address?.companyName,
      address1: u.address?.address1,
      address2: u.address?.address2,
      country: u.address?.country,
      state_province_region: u.address?.state_province_region,
      city: u.address?.city,
      zip_postalCode: u.address?.zip_postalCode,
      phone: u.address?.phone,
      mobile: u.address?.mobile,
      emailBusiness: u.address?.emailBusiness,
      web: u.address?.web,
    })
  }
  ngOnInit() {
    this.userSub = this.authService.user$.pipe(
      map(p => {
        this.initUserDataFormGroup(p),
          this.initTrainerDataFormGroup(p),
          this.authService.userProvidersList(p.email)
        this.user = p
        this.isLoggedIn = true
        this.seletctSubscriptionPlaneForUserCategory(p)
        console.log(this.subscriptionPlaneForUserCategories[0]);

        if (p.stripeInfoGC !== undefined && p.stripeInfoGC.current_period_end) {
          this.dueDate = this.utility.isSubscripitionOutOfDate(p.stripeInfoGC.current_period_end)
        }

      })
    ).subscribe()
  }

  seletctSubscriptionPlaneForUserCategory(u: User) {
    if (u.userCategory == "trainer") {
      this.subscriptionPlaneForUserCategories = [{ pricePlan: "price_1IHNLhBFHWy6VCCKf3wFDojY", price: "112,22$", cadence: "Monthly" }, { pricePlan: "price_1IHNLhBFHWy6VCCKf3wFDojY", price: "115,22$", cadence: "Quartely" }, { pricePlan: "price_1IHNLhBFHWy6VCCKf3wFDojY", price: "118,22$", cadence: "Yearly" }]
    } else {
      this.subscriptionPlaneForUserCategories = [{ pricePlan: "price_1IHNLhBFHWy6VCCKf3wFDojY", price: "2,22$", cadence: "Monthly" }, { pricePlan: "price_1IHNLhBFHWy6VCCKf3wFDojY", price: "5,22$", cadence: "Quartely" }, { pricePlan: "price_1IHNLhBFHWy6VCCKf3wFDojY", price: "8,22$", cadence: "Yearly" }]
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
    this.userSub = this.authService.user$.subscribe(u => {
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
    console.log("event");
    console.log(event);

    let userCategory = ""
    this.selectUserTypeId == 1 ? userCategory = "athlete" : userCategory = "trainer"
    this.strpieService.startSubscriptionCheckoutSession(event, userCategory)
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
    let userCategory = ""
    this.selectUserTypeId == 1 ? userCategory = "athlete" : userCategory = "trainer"
    this.strpieService.startSubscriptionCheckoutSession(this.subscriptionPlaneForUserCategories[1].pricePlan, userCategory)
      .subscribe(
        session => this.strpieService.redirectToCheckout(session),
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      )
  }

  yearlySubscription() {
    let userCategory = ""
    this.selectUserTypeId == 1 ? userCategory = "athlete" : userCategory = "trainer"
    this.strpieService.startSubscriptionCheckoutSession(this.subscriptionPlaneForUserCategories[2].pricePlan, userCategory)
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
    console.log(trainerContat);
    this.authService.addTrainerContacts(this.authService.userID, trainerContat)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
