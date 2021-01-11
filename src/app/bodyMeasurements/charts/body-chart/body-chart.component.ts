import { ChartFeederService } from './../chart-feeder.service';
import { Girths } from './../../../interface-model/girths.model';
import { SkinfoldsForDB } from './../../../interface-model/skinfold.model';
import { Subscription } from 'rxjs';
import { ChartContainerComponent } from './../chart-container.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-body-chart',
  templateUrl: './body-chart.component.html',
  styleUrls: ['./body-chart.component.css']
})

export class BodyChartComponent implements OnInit, OnDestroy {

  constructor(
    private chartsFeederService: ChartFeederService,
    private chartContainerComponent: ChartContainerComponent) { }

  private exchangeSubscriptionGirth: Subscription
  private exchangeSubscriptionSkinfold: Subscription

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void { }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void { }

  data: any
  lineChartGirthsOverSkinfolds: Chart
  girths: Girths[]
  skinfolds: SkinfoldsForDB[]
  selected_girth_skinfold_id: any;

  ngOnInit() {
    this.exchangeSubscriptionGirth = this.chartContainerComponent.girthsSubj.subscribe((g: Girths[]) => {
      this.girths = g
    })

    this.exchangeSubscriptionSkinfold = this.chartContainerComponent.skinfoldsSubj.subscribe((s: SkinfoldsForDB[]) => {
      this.skinfolds = s
    })
    this.selected_girth_skinfold_id = 1;
    this.lineChartGirthsOverSkinfolds = this.chartsFeederService.lineChartSkinfoldsOverGirths(this.skinfolds, this.girths, this.selected_girth_skinfold_id)
  }

  girth_skinfold: any[] = [
    { name: 'Arm - girth & skinfold', id: 1 },
    { name: 'Chest - girth & skinfold', id: 2 },
    { name: 'Abdominal - girth & skinfold', id: 3 },
    { name: 'Thigt - girth & skinfold', id: 4 },
    { name: 'Calf - girth & skinfold', id: 5 }
  ];

  selectChart(girth_skinfold) {
    this.selected_girth_skinfold_id = girth_skinfold.id;
    let a = []
    let max: number
    this.lineChartGirthsOverSkinfolds.destroy()
    this.lineChartGirthsOverSkinfolds = this.chartsFeederService.lineChartSkinfoldsOverGirths(this.skinfolds, this.girths, this.selected_girth_skinfold_id)

  }

  ngOnDestroy(): void {
    this.exchangeSubscriptionGirth.unsubscribe()
    this.exchangeSubscriptionSkinfold.unsubscribe()
  }
}

