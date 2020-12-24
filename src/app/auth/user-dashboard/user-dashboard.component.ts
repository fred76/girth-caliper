import { Utility } from './../../Utility/utility';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true },
  }, DatePipe]
})
export class UserDashboardComponent implements OnInit {

  constructor(public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private utility: Utility,
    private datePipe: DatePipe,) {
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
  birthDate: string
  nickname: string
  gender: string
  genders: string[] = ["Male", "Female"]

  // constructor(private _formBuilder: FormBuilder) {}

  calculateAge(birthdate: any): number {
    return moment().diff(birthdate, 'years');
  }

  ngOnInit() {
    this.authService.user$.subscribe(u => {
      let dateString = this.datePipe.transform(u.dateOfBirth.seconds * 1000, 'MM/dd/yyyy');
      let birthday = new Date(dateString)
      console.log("PIPPO " + birthday);

      this.userDataFormGroup = this._formBuilder.group({
        genderControl: new FormControl(u.gender, Validators.required),
        nicknameControl: new FormControl(u.nickname),
        userNameControl: new FormControl(u.displayName, Validators.required),
        birthDateControl: new FormControl(birthday, Validators.required),
      });
      this.authService.userProvidersList(u.email)
    })
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

}
