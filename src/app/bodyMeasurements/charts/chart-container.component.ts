
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-container',
  template: `

  <mat-drawer-container  [hasBackdrop]="false"   >
    <mat-drawer mode="push"  opened="true" >
    <app-btn-sidenav-animated
    [btnStatus]="'btn-Girth'">
    </app-btn-sidenav-animated>
    </mat-drawer >
    <mat-drawer-content autosize=true>
      <div class="ddd">
    <router-outlet ></router-outlet>
  </div>
    </mat-drawer-content>
  </mat-drawer-container>

 `,
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
