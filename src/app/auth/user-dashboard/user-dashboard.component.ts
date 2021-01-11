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

  ngOnInit() {

    this.userSub = this.authService.user$
      .subscribe(u => {
        if (u) {
          this.user = u
          this.isLoggedIn = true
        }
        this.dueDate = this.utility.isSubscripitionOutOfDate(u.current_period_end)
        u.gender ? this.gender = u.gender : this.gender = null
        u.nickname ? this.nickname = u.nickname : this.nickname = null
        u.dateOfBirth ? this.dateOfBirth = new Date(u.dateOfBirth.seconds * 1000) : this.dateOfBirth = null
        u.displayName ? this.displayName = u.displayName : this.displayName = null

        this.userDataFormGroup = new FormGroup({
          genderControl: new FormControl(this.gender, Validators.required),
          nicknameControl: new FormControl(this.nickname),
          userNameControl: new FormControl(this.displayName, Validators.required),
          birthDateControl: new FormControl(this.dateOfBirth, Validators.required),
        });
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
    this.strpieService.startSubscriptionCheckoutSession("price_1I6exwBFHWy6VCCK42Ftalrj")
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
    this.strpieService.startSubscriptionCheckoutSession("price_1I6exwBFHWy6VCCK42Ftalrj")
      .subscribe(
        session => this.strpieService.redirectToCheckout(session),
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      )
  }

  yearlySubscription() {
    this.strpieService.startSubscriptionCheckoutSession("price_1I6exwBFHWy6VCCK42Ftalrj")
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
    this.authService.addGender(this.authService.userID, this.userDataFormGroup.value.genderControl)
    this.authService.addDateOfBirth(this.authService.userID, this.userDataFormGroup.value.birthDateControl)
    this.authService.addNickname(this.authService.userID, this.userDataFormGroup.value.nicknameControl)
    this.authService.addGiveName(this.authService.userID, this.userDataFormGroup.value.userNameControl)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
