import { ChartService } from '../../../Services/chart.service';

import { Utility } from 'src/app/Utility/utility';
import { DummyDataService } from '../../../Utility/dummyData.service';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

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
    private utility: Utility,
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


    let localDummyArray = [...this.dummyDataService.dummyArray]

    this.chartsService.createGirthsArrayForCharts(localDummyArray)

    this.lineChartData = this.chartsService.feedGirthsChartData().arrayChartDataSet
    this.lineChartLabels = this.chartsService.lineChartLabels
    this.lineChartOptions = this.chartsService.lineChartOption("Girths", "Body weight", 120)
    this.lineChartLegend = this.chartsService.lineChartLegend
    this.lineChartType = this.chartsService.lineChartType

  }
}



/*
import { Utility } from './../../../Utility/utility';
import { CaliperService } from './../../../Services/caliper.service';
import { ChartService } from '../../../Services/chart.service';
import { DummyDataService } from '../../../Utility/dummyData.service';


import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-skinfolds-chart',
  templateUrl: './skinfolds-chart.component.html',

  styleUrls: ['./skinfolds-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SkinfoldsChartComponent implements OnInit {


  showChart: boolean
  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService,
    private caliperService: CaliperService,
    private utility: Utility) { }

  lineChartData: any[]
  lineChartLabels: any[][]
  lineChartOptions: any
  lineChartColors: any[]
  lineChartLegend: boolean
  lineChartType: any

  barChartData: any[]
  barChartLabels: any[]
  barChartOptions: any
  barChartPlugins: any[]
  barChartLegend: boolean
  barChartType: any

  pieChartOptions: any
  pieChartLabels: any[]
  pieChartData: any
  pieChartType: any
  pieChartLegend: boolean
  pieChartPlugins: any
  pieChartColors: any[]
  foldSkin: any
  method: string
  bodyWeight: number
  bodyDensity: number
  bodyFatPercentage: number
  sum: number



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {

    console.log("dfghj")
    let localDummyArray = [...this.dummyDataService.dummyArrayCaliper]
    // let localDummyArrayLastElement = localDummyArray[localDummyArray.length - 1]
    // let localDummyArrayLastSecondElement = localDummyArray[localDummyArray.length - 2]






    // let skinfoldObject = this.caliperService.feedCalipeCardDatas(localDummyArrayLastElement)


    this.chartsService.createSkinfoldsArrayForCharts(localDummyArray)
    this.lineChartData = this.chartsService.feedSkinfoldsChartData().arrayChartDataSet
    this.lineChartLabels = this.chartsService.lineChartMultiLabels
    this.lineChartOptions = this.chartsService.lineChartOption("Skinfold", "Body weight", 30)
    this.lineChartLegend = this.chartsService.lineChartLegend
    this.lineChartType = this.chartsService.lineChartType

    // this.barChartData = this.chartsService.barChartData(skinfoldObject.foldSkinValueArray,'')
    // this.barChartLabels = this.chartsService.barChartLabels(skinfoldObject.foldSkinTitleArray)
    // this.barChartOptions = this.chartsService.barChartOptions
    // this.barChartPlugins = this.chartsService.barChartPlugins
    // this.barChartLegend = this.chartsService.barChartLegend
    // this.barChartType = this.chartsService.barChartType

    // this.pieChartOptions = this.chartsService.pieChartOptions
    // this.pieChartLabels = this.chartsService.pieChartLabels
    // this.pieChartData = this.chartsService.pieDataChart(this.utility.numberDecimal(this.caliperService.feedCalipeCardData(localDummyArrayLastElement.metadata.method,localDummyArrayLastElement.metadata.age,localDummyArrayLastElement.metadata.weight).fatMass, 2), this.utility.numberDecimal(this.caliperService.feedCalipeCardData(localDummyArrayLastElement.metadata.method,localDummyArrayLastElement.metadata.age,localDummyArrayLastElement.metadata.weight).leanMass, 2))
    // this.pieChartType = this.chartsService.pieChartType
    // this.pieChartLegend = this.chartsService.pieChartLegend
    // this.pieChartPlugins = this.chartsService.pieChartPlugins
    // this.pieChartColors = this.chartsService.pieChartColors




  }

}



*/
