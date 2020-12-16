import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.css']
})
export class LoginRedirectComponent implements OnInit {

  constructor(
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
  ngOnInit(): void { }

}
