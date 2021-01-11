import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';


import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
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

  isSignInWithEmail: boolean = false
  emailF = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  url: string

  isSignInWithEmailAction() {
    this.isSignInWithEmail = !this.isSignInWithEmail
  }

  ngOnInit() {
    this.url = this.router.url;
  }

  getErrorMessage() {
    if (this.emailF.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailF.hasError('email') ? 'Not a valid email' : '';
  }
}
