import { ChartService } from '../../../Services/chart.service';
import { DummyDataService } from '../../../Utility/dummyData.service';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-girths-chart',
  template: `
  <mat-card class="mat-elevation-z4"><mat-card-header class="mat-headline">Girths over the time</mat-card-header></mat-card>
  <mat-card class="mat-elevation-z8" >
  <canvas baseChart
  [datasets]="lineChartData"
  [labels]="lineChartLabels"
  [options]="lineChartOptions"
  [legend]="lineChartLegend"
  [chartType]="lineChartType"
  (chartHover)="chartHovered($event)"
  (chartClick)="chartClicked($event)">
  </canvas>
</mat-card>  `,

  styles: [`
   .mat-elevation-z8 { margin: 10px; padding: 10px; }  .mat-elevation-z4 { margin: 10px; padding: 10px; }`],
  encapsulation: ViewEncapsulation.None
})

export class GirthsChartComponent implements OnInit {
  showChart: boolean
  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService) { }

  lineChartData: any[]
  lineChartLabels: any[]
  lineChartOptions: any
  lineChartColors: any[]
  lineChartLegend: boolean
  lineChartType: any

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {


    if (this.dummyDataService.dummyArray.length == 0) {
      this.dummyDataService.createGirth()
    }

    let localDummyArray = [...this.dummyDataService.dummyArray]

    let girthsCharLineData = this.chartsService.girthLineChartData(localDummyArray)

    this.lineChartData = girthsCharLineData.arrayChartDataSet
    this.lineChartLabels = this.chartsService.lineChartLabels
    this.lineChartOptions = this.chartsService.lineChartOption("Girths", "Body weight", girthsCharLineData.maxWeight)
    this.lineChartLegend = this.chartsService.lineChartLegend
    this.lineChartType = this.chartsService.lineChartType

  }
}

