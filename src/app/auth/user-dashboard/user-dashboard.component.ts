import { StrpieService } from './../strpie.service';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true } }]
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private strpieService: StrpieService) {
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

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(u => {
      if (u) {
        this.isLoggedIn = true
      }

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


  purchaseSubscription() {
    this.strpieService.startSubscriptionCheckoutSession("price_1I5HSDBFHWy6VCCKqE4IrMcX")
      .subscribe(
        session => this.strpieService.redirectToCheckout(session),
        err => {
          console.log("Error creating checkout session", err);
          this.isPurchaseStrated = false;
        }
      );
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
