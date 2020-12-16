import { SkinfoldsForDB } from './../../interface-model/skinfold.model';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Girths } from './../../interface-model/girths.model';
import { ChartService } from './chart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
export class ChartContainerComponent implements OnInit, OnDestroy {


  constructor(private fireDatabaseService: FireDatabaseService) { }

  girthsSubj = new BehaviorSubject<Girths[]>([]);
  skinfoldsSubj = new BehaviorSubject<SkinfoldsForDB[]>([]);

  private exchangeSubscription: Subscription
  ngOnInit() {
    this.exchangeSubscription = (this.fireDatabaseService.girthsSubj.subscribe((girths: Girths[]) => {
      this.girthsSubj.next(girths)
    }))
    this.fireDatabaseService.fetchAvailableGirths()
    this.exchangeSubscription = this.fireDatabaseService.skinfoldsSubj.subscribe((skinFolds: SkinfoldsForDB[]) => {
      this.skinfoldsSubj.next(skinFolds)
    })
    this.fireDatabaseService.fetchAvailableSkinfolds()

  }
  unsub() {
    this.fireDatabaseService.cancelSubscription()
    this.exchangeSubscription.unsubscribe()
    // this.exchangeSubscription.forEach(sub => sub.unsubscribe())
  }
  ngOnDestroy(): void {
    this.unsub()
  }
}
