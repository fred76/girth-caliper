import { Girths } from './../../../interface-model/girths.model';
import { concatAll, concatMap, take } from 'rxjs/Operators';
import { SkinfoldsForDB } from './../../../interface-model/skinfold.model';
import { Subscription, concat } from 'rxjs';
import { ChartContainerComponent } from './../chart-container.component';
import { DummyDataService } from './../../../Utility/dummyData.service';
import { ChartService } from '../chart.service';
import { Component, OnInit } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-body-chart',
  templateUrl: './body-chart.component.html',
  styleUrls: ['./body-chart.component.css']
})

export class BodyChartComponent implements OnInit {

  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService,
    private chartContainerComponent: ChartContainerComponent) { }

  lineChartGirthsOverSkinfolds: any
  localDummyArray = []
  localDummyArrayGirths = []

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  data: any

  private exchangeSubscriptionGirth: Subscription
  private exchangeSubscriptionSkinfold: Subscription

  girths: Girths[]
  skinfolds: SkinfoldsForDB[]

  ngOnInit() {
    this.exchangeSubscriptionGirth = this.chartContainerComponent.girthsSubj.subscribe((g: Girths[]) => {
      this.girths = g
    })

    this.exchangeSubscriptionSkinfold = this.chartContainerComponent.skinfoldsSubj.subscribe((s: SkinfoldsForDB[]) => {
      this.skinfolds = s
    })
    this.selected_girth_skinfold_id = 1;
    this.data = this.chartsService.compareGirthsSkinfolds(this.skinfolds, this.girths)
    this.lineChartGirthsOverSkinfolds = this.chartsService.lineChartGirthsOverSkinfolds(this.data.armDataSet, this.data.avarageDateArray, this.data.maxArm)
  }

  ngOnDestroy(): void {
    this.exchangeSubscriptionGirth.unsubscribe()
    this.exchangeSubscriptionSkinfold.unsubscribe()
  }
  girth_skinfold: any[] = [
    { name: 'Arm - girth & skinfold', id: 1 },
    { name: 'Chest - girth & skinfold', id: 2 },
    { name: 'Abdominal - girth & skinfold', id: 3 },
    { name: 'Thigt - girth & skinfold', id: 4 },
    { name: 'Calf - girth & skinfold', id: 5 }
  ];

  selected_girth_skinfold_id: any;

  selectChart(girth_skinfold) {
    this.selected_girth_skinfold_id = girth_skinfold.id;
    let a = []
    let max: number
    switch (true) {
      case girth_skinfold.id == 1: a = this.data.armDataSet, a = this.data.armDataSet; max = this.data.maxArm; break
      case girth_skinfold.id == 2: a = this.data.chestDataSet; max = this.data.maxChest; break
      case girth_skinfold.id == 3: a = this.data.abdominalDataSet; max = this.data.maxAbs; break
      case girth_skinfold.id == 4: a = this.data.thighDataSet; max = this.data.maxThigh; break
      case girth_skinfold.id == 5: a = this.data.armDataSet; max = this.data.maxCalf; break

    }
    this.chartsService.UpdateLineChartGirthsOverSkinfolds(this.lineChartGirthsOverSkinfolds, a, max)
  }
}

