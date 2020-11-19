import { Subject } from 'rxjs';
import { Utility } from './../../../Utility/utility';
import { ChartService } from '../../../Services/chart.service';
import { DummyDataService } from '../../../Utility/dummyData.service';
import { CaliperService } from './../../../Services/caliper.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CaliperForDB } from 'src/app/interface-model/caliper.model';

@Component({
  selector: 'app-skinfolds-chart',
  templateUrl: './skinfolds-chart.component.html',

  styleUrls: ['./skinfolds-chart.component.css']
})
export class SkinfoldsChartComponent implements OnInit  {

  showChart: boolean
  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService,
    private caliperService: CaliperService,
    private utility: Utility) { }


  private toggleBoyCompChartEvent = new Subject<Event>();
  private nextBodyCompDateEvent = new Subject<Event>();
  private previousBodyCompDateEvent = new Subject<Event>();
  private toggleSkinfoldChartListEvent = new Subject<Event>();


  @Input() toggleBodyCompChart: boolean = false
  @Input() selectorBodyCompDate: number = 1
  @Input() isShowNextBodyCompButton: boolean = false
  @Input() isToggleSkinfoldChartList: boolean = false


  displayedColumns = [ "method", "age", "date", "weight", "Chest", "Subscapular", "Midaxillary", "Triceps", "Bicep", "Suprailiac", "Abdominal", "Thigh" ]

  dataSource = new MatTableDataSource<CaliperForDB>()

  toggleSkinfoldChartListButton(event: Event) {
    this.toggleSkinfoldChartListEvent.next(event);
    this.isToggleSkinfoldChartList = !this.isToggleSkinfoldChartList
    this.createSkinfoldsChart()
  }

  toggleBodyCompChartButton(event: Event) {
    this.toggleBoyCompChartEvent.next(event);
    this.toggleBodyCompChart = !this.toggleBodyCompChart
    this.createBodyCompositionTile(this.selectorBodyCompDate)
  }


  previousBodyCompChartButton(event: Event) {
    this.previousBodyCompDateEvent.next(event);
    if (this.selectorBodyCompDate < this.dummyDataService.dummyArrayCaliper.length) {
      this.selectorBodyCompDate += 1
      this.createBodyCompositionTile(this.selectorBodyCompDate)
      this.isShowNextBodyCompButton = true
    } else {
      new alert("Load more content")
    }
    this.createBodyCompositionTile(this.selectorBodyCompDate)
  }

  nextBodyCompChartButton(event: Event) {
    this.nextBodyCompDateEvent.next(event);
    if (this.selectorBodyCompDate > 1) {
      this.selectorBodyCompDate -= 1
      this.createBodyCompositionTile(this.selectorBodyCompDate)
    } else {
      this.isShowNextBodyCompButton = false
      new alert("Finito")
    }
  }

  localDummyArray = []

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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  createSkinfoldsChart() {
    let localDummyArray = [...this.dummyDataService.dummyArrayCaliper]
    let maxSkinfold = this.chartsService.createSkinfoldsArrayForCharts(localDummyArray)

    this.lineChartData = this.chartsService.feedSkinfoldsChartData().arrayChartDataSet
    this.lineChartLabels = this.chartsService.lineChartMultiLabels
    this.lineChartOptions = this.chartsService.lineChartOption("Skinfold", "Body weight", maxSkinfold)
    this.lineChartLegend = this.chartsService.lineChartLegend
    this.lineChartType = this.chartsService.lineChartType


    let localDummyArraySorted = [...localDummyArray].sort((d2, d1) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())

    this.dataSource.data = localDummyArraySorted




  }

  createBodyCompositionTile(n: number) {

    let localDummyArray = [...this.dummyDataService.dummyArrayCaliper]

    localDummyArray = [...localDummyArray].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())


    let localDummyArrayLastElement = localDummyArray[localDummyArray.length - n]

    let skinfoldObject = this.caliperService.feedCaliperDataForChart(localDummyArrayLastElement)

    this.method = skinfoldObject.method
    this.date = skinfoldObject.date
    this.sum = skinfoldObject.sum
    this.weight = skinfoldObject.weight
    this.age = skinfoldObject.age
    this.bodyDensity = this.utility.numberDecimal(skinfoldObject.bodyDensity, 2)
    this.bodyFatPercentage = this.utility.numberDecimal(skinfoldObject.bodyFatPerc, 2)

    if (this.selectorBodyCompDate < this.dummyDataService.dummyArrayCaliper.length) {

      let localDummyArrayLastSecondElement = localDummyArray[localDummyArray.length - n - 1]
      let skinfoldObjectSecondlast = this.caliperService.feedCaliperDataForChart(localDummyArrayLastSecondElement)

      let sumSecondlast = skinfoldObjectSecondlast.sum
      let bodyDensitySecondlast = this.utility.numberDecimal(skinfoldObjectSecondlast.bodyDensity, 2)
      let bodyFatPercentageSecondlast = this.utility.numberDecimal(skinfoldObjectSecondlast.bodyFatPerc, 2)

      this.sum > sumSecondlast ? this.isSumIncreasing = true : this.isSumIncreasing = false
      this.bodyDensity > bodyDensitySecondlast ? this.isBodyDensityIncreasing = true : this.isBodyDensityIncreasing = false
      this.bodyFatPercentage > bodyFatPercentageSecondlast ? this.isBodyFatPercentageIncreasing = true : this.isBodyFatPercentageIncreasing = false

    }

    if (this.toggleBodyCompChart) {
      this.barChartData = this.chartsService.barChartData(skinfoldObject.foldSkinValueArray, '')
      this.barChartLabels = this.chartsService.barChartLabels(skinfoldObject.foldSkinTitleArray)
      this.barChartOptions = this.chartsService.barChartOptions
      this.barChartPlugins = this.chartsService.barChartPlugins
      this.barChartLegend = this.chartsService.barChartLegend
      this.barChartType = this.chartsService.barChartType
    } else {
      this.pieChartOptions = this.chartsService.pieChartOptions
      this.pieChartLabels = this.chartsService.pieChartLabels
      this.pieChartData = this.chartsService.pieDataChart(this.utility.numberDecimal(skinfoldObject.fatMass, 2), this.utility.numberDecimal(skinfoldObject.leanMass, 2))
      this.pieChartType = this.chartsService.pieChartType
      this.pieChartLegend = this.chartsService.pieChartLegend
      this.pieChartPlugins = this.chartsService.pieChartPlugins
      this.pieChartColors = this.chartsService.pieChartColors
    }

  }


  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {

    this.createSkinfoldsChart()

    this.createBodyCompositionTile(1)

  }

}

