import { SkinfoldsForDB } from './../../../interface-model/skinfold.model';
import { ChartContainerComponent } from './../chart-container.component';
import { ChartService } from './../chart.service';
import { FireDatabaseService } from './../../../Services/fire-database.service';

import { LoadMoreSkinfoldComponent } from './loadMoreSkinfold';
import { MatDialog } from '@angular/material/dialog';
import { ImportExportService } from './../../../Services/import-export.service';
import { Subject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-skinfolds-chart',
  templateUrl: './skinfolds-chart.component.html',

  styleUrls: ['./skinfolds-chart.component.css']
})
export class SkinfoldsChartComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    public chartsService: ChartService,
    private fireDatabaseService: FireDatabaseService,
    private importExportService: ImportExportService,
    private chartContainerComponent: ChartContainerComponent) { }


  private toggleBoyCompChartEvent = new Subject<Event>();
  private nextBodyCompDateEvent = new Subject<Event>();
  private previousBodyCompDateEvent = new Subject<Event>();
  private toggleSkinfoldChartListEvent = new Subject<Event>();
  private toggleSkinfoldBodyCompeEvent = new Subject<Event>();

  @Input() toggleBodyCompChart: boolean = true
  @Input() selectorBodyCompDate: number = 1
  @Input() isShowNextBodyCompButton: boolean = false
  @Input() isToggleSkinfoldChartList: boolean = false
  @Input() toggleSkinfoldBodyComp: boolean = true;

  displayedColumns = ["method", "age", "date", "weight", "Chest", "Subscapular", "Midaxillary", "Triceps", "Bicep", "Suprailiac", "Abdominal", "Thigh"]
  displayedColumnsBody = ["method", "age", "date", "weight", "Skinfolds sum", "Body Density", "Fat Percentage", "Lean Mass", "Fat Mass"]

  showChart: boolean
  show: boolean = true
  private exchangeSubscription: Subscription

  SkinfoldsArray: SkinfoldsForDB[] = []

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
  pieChartPlugins: any
  pieChartColors: any[]

  method: string
  date: Date
  weight: number
  age: number

  bodyDensity: number
  bodyFatPercentage: number
  sum: number

  bodyDensitySecondlast: number
  bodyFatPercentageSecondlast: number
  sumSecondlast: number

  isBodyDensityIncreasing: boolean
  isBodyFatPercentageIncreasing: boolean
  isSumIncreasing: boolean

  dataSource = new MatTableDataSource<SkinfoldsForDB>()

  loadSkinfoldsSince: Date

  lineChartSkinfoldsBodyComposition: any

  pieBarBodyComposition: any

  clickExportSkinfolds() {
    this.importExportService.flatSkinfoldsForDB(this.SkinfoldsArray)
  }

  toggleSkinfoldBodyCompButton(event: Event) {
    this.toggleSkinfoldBodyCompeEvent.next(event)
    this.toggleSkinfoldBodyComp = !this.toggleSkinfoldBodyComp
    let lineChart = this.chartsService.skinfoldLineChartData(this.SkinfoldsArray)
    if (!this.toggleSkinfoldBodyComp) {
      this.chartsService.UpdateLineChartSkinfolds(this.lineChartSkinfoldsBodyComposition, lineChart.bodyCompostitionDataSet, lineChart.maxSkinfold + 10, lineChart.maxWeight, lineChart.maxBodyDensity)
    } else {
      this.chartsService.UpdateLineChartSkinfoldsBack(this.lineChartSkinfoldsBodyComposition, lineChart.skinfoldChartDataSet, lineChart.skinfoldXaxisLabel, lineChart.maxSkinfold, lineChart.maxWeight)
    }

  }

  ngOnInit(): void {
    this.fireDatabaseService.populateSkinfolds()
    this.exchangeSubscription = this.chartContainerComponent.skinfoldsSubj.subscribe((s: SkinfoldsForDB[]) => {
      this.show = false
      this.SkinfoldsArray = s
      this.dataSource.data = s
      this.createBodyCompositionTile(1, s)
      let lineChart = this.chartsService.skinfoldLineChartData(s)
      this.lineChartSkinfoldsBodyComposition = this.chartsService.lineChartSkinfolds(lineChart.skinfoldChartDataSet, lineChart.skinfoldXaxisLabel, lineChart.maxSkinfold, lineChart.maxWeight)

    })
  }

  toggleSkinfoldChartListButton(event: Event) {
    this.toggleSkinfoldChartListEvent.next(event);
    this.isToggleSkinfoldChartList = !this.isToggleSkinfoldChartList
  }

  toggleBodyCompChartButton(event: Event) {
    this.toggleBoyCompChartEvent.next(event);
    this.toggleBodyCompChart = !this.toggleBodyCompChart
    this.createBodyCompositionTile(this.selectorBodyCompDate, this.SkinfoldsArray)
  }

  previousBodyCompChartButton(event: Event) {
    this.previousBodyCompDateEvent.next(event);
    if (this.selectorBodyCompDate < this.SkinfoldsArray.length) {
      this.selectorBodyCompDate += 1
      this.createBodyCompositionTile(this.selectorBodyCompDate, this.SkinfoldsArray)
      this.isShowNextBodyCompButton = true
    } else {
      const dialogRef = this.dialog.open(LoadMoreSkinfoldComponent, {
        data: { measurementDate: this.loadSkinfoldsSince }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      })
    }
    this.createBodyCompositionTile(this.selectorBodyCompDate, this.SkinfoldsArray)
  }

  nextBodyCompChartButton(event: Event) {
    this.nextBodyCompDateEvent.next(event);
    if (this.selectorBodyCompDate > 1) {
      this.selectorBodyCompDate -= 1
      this.createBodyCompositionTile(this.selectorBodyCompDate, this.SkinfoldsArray)
    } else {
      this.isShowNextBodyCompButton = false
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  createBodyCompositionTile(n: number, skinfoldsArray: SkinfoldsForDB[]) {
    if (skinfoldsArray.length > 0) {
      let lastSkinfoldInArray = skinfoldsArray[skinfoldsArray.length - n]
      this.method = lastSkinfoldInArray.metadata.method
      this.date = lastSkinfoldInArray.metadata.date
      this.sum = lastSkinfoldInArray.bodyResult.skinfoldsSum
      this.weight = lastSkinfoldInArray.metadata.weight
      this.age = lastSkinfoldInArray.metadata.age
      this.bodyDensity = lastSkinfoldInArray.bodyResult.bodyDensity
      this.bodyFatPercentage = lastSkinfoldInArray.bodyResult.bodyFatPercentage

      if (this.selectorBodyCompDate < this.SkinfoldsArray.length) {
        let secondLastSkinfoldArray = skinfoldsArray[skinfoldsArray.length - n - 1]
        let sumSecondlast = secondLastSkinfoldArray.bodyResult.skinfoldsSum
        let bodyDensitySecondlast = secondLastSkinfoldArray.bodyResult.bodyDensity
        let bodyFatPercentageSecondlast = secondLastSkinfoldArray.bodyResult.bodyFatPercentage
        this.sum > sumSecondlast ? this.isSumIncreasing = true : this.isSumIncreasing = false
        this.bodyDensity > bodyDensitySecondlast ? this.isBodyDensityIncreasing = true : this.isBodyDensityIncreasing = false
        this.bodyFatPercentage > bodyFatPercentageSecondlast ? this.isBodyFatPercentageIncreasing = true : this.isBodyFatPercentageIncreasing = false
      }

      let foldSkinTitleArray = Object.keys(lastSkinfoldInArray.fold)
      let foldSkinValueArray = Object.values(lastSkinfoldInArray.fold)

      this.barChartData = this.chartsService.barChartData(foldSkinValueArray)
      this.barChartLabels = this.chartsService.barChartLabels(foldSkinTitleArray)
      this.barChartOptions = this.chartsService.barChartOptions
      this.barChartPlugins = this.chartsService.barChartPlugins
      this.barChartLegend = this.chartsService.barChartLegend
      this.barChartType = this.chartsService.barChartType

      this.pieChartOptions = this.chartsService.pieChartOptions
      this.pieChartLabels = this.chartsService.pieChartLabels
      this.pieChartData = this.chartsService.pieDataChart(lastSkinfoldInArray.bodyResult.fatMass, lastSkinfoldInArray.bodyResult.leanMass)
      this.pieChartType = this.chartsService.pieChartType
      this.pieChartPlugins = this.chartsService.pieChartPlugins
      this.pieChartColors = this.chartsService.pieChartColors
    }
  }



  ngOnDestroy(): void {
    this.exchangeSubscription.unsubscribe()
  }

}

