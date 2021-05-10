import { Subscription  } from 'rxjs';
// import { User } from './../../interface-model/user.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { UserType } from 'src/app/interface-model/Interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/accessory/logo.svg")
    );
  }

  user: UserType<any>
  authSubscription: Subscription

  ngOnInit(): void {
    this.authSubscription = this.authService.UserType$.subscribe(user => {
      this.user = user
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

}
