import { Utility } from 'src/app/Utility/utility';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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
<div *ngIf='authService.UserType$ | async; then authenticated else notAuthenticated'></div>
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
  styleUrls: ['./athlete-trainer.component.css']
})
export class AthleteTrainerComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    private router: Router,
    private utility: Utility
  ) { }

  userUnsubscribe: Subscription
  routerUnsubscribe1: Subscription
  routerUnsubscribe2: Subscription
  navLinks: any[]
  activeLink = 0

  ngOnInit(): void {




    this.authService.UserType$.subscribe(u => {
console.log("u.profile?.userCategory");
console.log(u.profile?.userCategory);
console.log("u.profile?.userCategory");

      if (u.profile?.userCategory == "athlete") {
        this.navLinks = [
          { label: 'Girths', link: './girthTab', index: 0 },
          { label: 'Skinfolds', link: './skinfoldTab', index: 1 },
          { label: 'Photo', link: './photoTab/userPhoto', index: 2 },
          { label: 'Insight', link: './insightTab/ghirthsChart', index: 3 },
          { label: 'Personal trainer', link: './trainerForUser', index: 4 }
        ]
      } else {
        this.navLinks = [
          { label: 'Dashboard', link: './trainer/trainerBio', index: 0 },
          { label: 'Bio & Training plans', link: './trainer/trainerPage', index: 1 },
          { label: 'Athletes', link: './trainer/athleteList', index: 2 },
          { label: 'Blog articles', link: './trainer/athleteList', index: 3 },
        ]
      }
    })


    this.userUnsubscribe = this.authService.UserType$.subscribe(p => {
      if (this.utility.isSubscripitionOutOfDate(p.stripeInfoGC.current_period_end)) {
        this.router.navigate(['/UserDashboard']);
      }
    })

    this.routerUnsubscribe1 = this.router.events.subscribe(() => {
      this.activeLink = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url))

    })



  }

  ngOnDestroy(): void {
    this.routerUnsubscribe1.unsubscribe()
    this.userUnsubscribe.unsubscribe()
  }
}
