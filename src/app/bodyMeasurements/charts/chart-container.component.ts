import { SkinfoldsForDB } from './../../interface-model/skinfold.model';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Girths } from './../../interface-model/girths.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chart-container',
  template: `
  <mat-drawer-container   class="mat-drawer-container-class " [hasBackdrop]="false"   >
    <mat-drawer mode="push"  opened="true" class="mat-drawer-class" >
    <app-btn-sidenav-animated
    [btnStatus]="'btn-Girth'">
    </app-btn-sidenav-animated>
    </mat-drawer >
    <mat-drawer-content class="mat-drawer-content-class"  autosize=true >
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

  private exchangeSubscription: Subscription
  private skinfoldArraySizeSubscription: Subscription
  private girthsArraySizeSubscription: Subscription

  girthsSubj = new BehaviorSubject<Girths[]>([]);
  skinfoldsSubj = new BehaviorSubject<SkinfoldsForDB[]>([])
  skinfoldArraySize = new BehaviorSubject<number>(0)
  girthsArraySize = new BehaviorSubject<number>(0)

  ngOnInit() {
    this.fireDatabaseService.populateSkinfolds()
    this.fireDatabaseService.populateGirths()
    this.exchangeSubscription = (this.fireDatabaseService.girthsSubj.subscribe((girths: Girths[]) => {
      this.girthsSubj.next(girths)
    }))
    this.girthsArraySizeSubscription = this.girthsArraySize.subscribe(p => {
      this.fireDatabaseService.fetchAvailableGirths(p)
    })
    this.exchangeSubscription = this.fireDatabaseService.skinfoldsSubj.subscribe((skinFolds: SkinfoldsForDB[]) => {
      this.skinfoldsSubj.next(skinFolds)
    })
    this.skinfoldArraySizeSubscription = this.skinfoldArraySize.subscribe(p => {
      this.fireDatabaseService.fetchAvailableSkinfolds(p)
    })

  }

  deleteGirth(id: string) {
    this.fireDatabaseService.deleteGirth(id)
  }

  deleteSkinfold(id: string) {
    this.fireDatabaseService.deleteSkinfolds(id)
  }

  unsub() {
    this.skinfoldArraySizeSubscription.unsubscribe()
    this.girthsArraySizeSubscription.unsubscribe()
    this.fireDatabaseService.cancelSubscription()
    this.exchangeSubscription.unsubscribe()
    // this.exchangeSubscription.forEach(sub => sub.unsubscribe())
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
