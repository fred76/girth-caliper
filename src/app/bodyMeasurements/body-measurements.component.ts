import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-body-measurements',
  template: `
  <nav mat-tab-nav-bar  >
  <a mat-tab-link
  *ngFor="let link of navLinks"
    [routerLink]="link.link"
    routerLinkActive #rla="routerLinkActive"
    [routerLinkActiveOptions]="{exact:true}"
  [active]="rla.isActive"
   >
{{link.label}}</a>
</nav>
<div class="router-content">
<div *ngIf='authService.user$ | async; then authenticated else notAuthenticated'></div>
<ng-template   #notAuthenticated>
 <div fxLayoutAlign="center center" style="margin-top: 200px !important;">
     <mat-card class="mat-elevation-z8 content"  >
       <mat-card-content >
         <mat-spinner >
         </mat-spinner>
       </mat-card-content>
     </mat-card>
 </div>

   </ng-template>

  <ng-template #authenticated>
  <router-outlet></router-outlet>
  </ng-template>
</div>
  `,
  styleUrls: ['./body-measurements.component.css']
})
export class BodyMeasurementsComponent implements OnInit {

  navLinks: any[]
  activeLink = 0
  constructor(
    public authService: AuthService,
    private router: Router
  ) {

    this.navLinks = [
      { label: 'Girths', link: './girthTab', index: 0 },
      { label: 'Skinfolds', link: './skinfoldTab', index: 1 },
      { label: 'Photo', link: './photoTab', index: 2 },
      { label: 'Insight', link: './insightTab', index: 3 }

    ]
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLink = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url))
    })
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }






}
