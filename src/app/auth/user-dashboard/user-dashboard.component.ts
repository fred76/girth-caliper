import { StrpieService } from './../strpie.service';
import { User } from './../../interface-model/user.model';
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
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true },
  }, DatePipe]
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
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
  dateOfBirth: string
  nickname: string
  gender: string
  genders: string[] = ["Male", "Female"]
  userSub: Subscription
  displayName: string
  isLoggedIn: boolean
  isPurchaseStrated: boolean
  dateBirth(user: User) {

    let dateString = this.datePipe.transform(user.dateOfBirth.seconds * 1000, 'MM/dd/yyyy');
    return new Date(dateString)
  }

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(u => {
      console.log(u.email)

      if (u) {
        this.isLoggedIn = true
      }

      u.gender ? this.gender = u.gender : this.gender = ""
      u.nickname ? this.nickname = u.nickname : this.nickname = ""
      u.dateOfBirth ? this.dateOfBirth = this.dateBirth(u).toLocaleString() : this.dateOfBirth = ""
      u.displayName ? this.displayName = u.displayName : this.displayName = ""

      this.userDataFormGroup = this._formBuilder.group({
        genderControl: new FormControl(this.gender, Validators.required),
        nicknameControl: new FormControl(this.nickname),
        userNameControl: new FormControl(this.displayName, Validators.required),
        birthDateControl: new FormControl(this.dateOfBirth, Validators.required),
      });
      this.authService.userProvidersList(u.email)
    })

  }

  purchaseSubscription(id: string) {

    this.isPurchaseStrated = true
    this.strpieService.startCheckoutSession(id).subscribe(session => {
      console.log("session 1");
      console.log(session);
      console.log("session 1");
      this.strpieService.redirectToCheckout(session)
      console.log("session");
      console.log(session);
      console.log("session");

    },
      err => {
        console.log("Error creating checkout session ...." + err);
        this.isPurchaseStrated = false
      }
    )
  }

  googleUnlinkLink(event: MatCheckboxChange): void {
    this.authService.unlinkGoolge(event.checked)
    console.log(event.checked);
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
