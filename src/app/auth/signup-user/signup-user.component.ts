import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router) {
  }

  emailUser = window.localStorage.getItem('emailForSignIn')

  emailCheck(email) {
    const url = this.router.url
    this.authService.insertEmailFromURL(url, email)
  }


  ngOnInit(): void {
    console.log("emailCheck() f " + this.emailUser)
    if (this.emailUser !== null) {
      console.log("emailCheck()")
      const url = this.router.url
      this.authService.confirmEmailFromURL(url)
      window.localStorage.removeItem('emailForSignIn');
    }

  }
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
