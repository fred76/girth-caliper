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
import { finalize } from 'rxjs/operators';

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

  userDataFormGroup: FormGroup;

  // USERS INFO

  nickname: string
  dateOfBirth: Date
  gender: string
  genders: string[] = ["Male", "Female"]
  userSub: Subscription
  displayName: string
  isLoggedIn: boolean
  isPurchaseStrated: boolean
  user: User
  dueDate: boolean
  selectUserTypeId: any;

  // TRAINESRS INFO

  trainerDataFormGroup: FormGroup;
  companyName: string
  address1: string
  address2: string
  country: string
  state_province_region: string
  city: string
  zip_postalCode: string
  phone: number
  mobile: number
  emailBusiness: string
  web: string



  userTypes: any[] = [
    { name: "I'm an Athlete", id: 1 },
    { name: "I'm a trainer", id: 2 }
  ];

  selectUserTypes(userTypes) {
    this.selectUserTypeId = userTypes.id
  }

  ngOnInit() {
    this.userSub = this.authService.user$
      .subscribe(u => {
        if (u) {
          this.user = u
          this.isLoggedIn = true
        }
        if (u.current_period_end) {
          this.dueDate = this.utility.isSubscripitionOutOfDate(u.current_period_end)
        }
        u.gender ? this.gender = u.gender : this.gender = null
        u.nickname ? this.nickname = u.nickname : this.nickname = null
        u.dateOfBirth ? this.dateOfBirth = new Date(u.dateOfBirth.seconds * 1000) : this.dateOfBirth = null
        u.displayName ? this.displayName = u.displayName : this.displayName = null

        this.userDataFormGroup = new FormGroup({
          gender: new FormControl(this.gender, Validators.required),
          nickname: new FormControl(this.nickname),
          displayName: new FormControl(this.displayName, Validators.required),
          dateOfBirth: new FormControl(this.dateOfBirth, Validators.required),
        });

        if (u.userCategory == 'trainer') {
          if (u.address) {
            u.address.companyName ? this.companyName = u.address.companyName : this.companyName = undefined
            u.address.phone ? this.phone = u.address.phone : this.phone = undefined
            u.address.mobile ? this.mobile = u.address.mobile : this.mobile = undefined
            u.address.emailBusiness ? this.emailBusiness = u.address.emailBusiness : this.emailBusiness = undefined
            u.address.web ? this.web = u.address.web : this.web = undefined
            u.address.address1 ? this.address1 = u.address.address1 : this.address1 = undefined
            u.address.address2 ? this.address2 = u.address.address2 : this.address2 = undefined
            u.address.country ? this.country = u.address.country : this.country = undefined
            u.address.state_province_region ? this.state_province_region = u.address.state_province_region : this.state_province_region = undefined
            u.address.city ? this.city = u.address.city : this.city = undefined
            u.address.zip_postalCode ? this.zip_postalCode = u.address.zip_postalCode : this.zip_postalCode = undefined
          }

          this.trainerDataFormGroup = new FormGroup({

            companyName: new FormControl(this.companyName, Validators.required),
            phone: new FormControl(this.phone, Validators.required),
            mobile: new FormControl(this.mobile, Validators.required),
            emailBusiness: new FormControl(this.emailBusiness, Validators.required),
            web: new FormControl(this.web, Validators.required),
            address1: new FormControl(this.address1, Validators.required),
            address2: new FormControl(this.address2, Validators.required),
            country: new FormControl(this.country, Validators.required),
            state_province_region: new FormControl(this.state_province_region, Validators.required),
            city: new FormControl(this.city, Validators.required),
            zip_postalCode: new FormControl(this.zip_postalCode, Validators.required),
          });

        }




        this.authService.userProvidersList(u.email)

      })


  }

  subscripitonUnsubscription(event: MatCheckboxChange) {
    this.strpieService.subscripitonUnsubscription(!event.checked, this.user.subscriptionId, false, false).subscribe(
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
    this.strpieService.subscripitonUnsubscription(false, this.user.subscriptionId, true, true)
  }

  monthlySubscription() {
    let userCategory = ""

    this.selectUserTypeId == 1 ? userCategory = "athlete" : userCategory = "trainer"

    this.strpieService.startSubscriptionCheckoutSession("price_1I6exwBFHWy6VCCK42Ftalrj", userCategory)
      .pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => this.strpieService.redirectToCheckout(session),
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      )
  }

  quarterlySubscription() {
    let userCategory = ""
    this.selectUserTypeId == 1 ? userCategory = "athlete" : userCategory = "trainer"
    this.strpieService.startSubscriptionCheckoutSession("price_1I6exwBFHWy6VCCK42Ftalrj", userCategory)
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
    this.strpieService.startSubscriptionCheckoutSession("price_1I6exwBFHWy6VCCK42Ftalrj", userCategory)
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
    this.authService.addTrainerContacts(this.authService.userID, trainerContat)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
