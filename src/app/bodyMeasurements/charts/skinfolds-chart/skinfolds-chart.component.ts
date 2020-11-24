import { LoadMoreSkinfoldComponent } from './loadMoreSkinfold';
import { MatDialog } from '@angular/material/dialog';
import { ImportExportService } from './../../../Services/import-export.service';
import { Subject } from 'rxjs';
import { ChartService } from '../../../Services/chart.service';
import { DummyDataService } from '../../../Utility/dummyData.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { SkinfoldsForDB } from 'src/app/interface-model/skinfold.model';

@Component({
  selector: 'app-skinfolds-chart',
  templateUrl: './skinfolds-chart.component.html',

  styleUrls: ['./skinfolds-chart.component.css']
})
export class SkinfoldsChartComponent implements OnInit {

  showChart: boolean
  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService,
    private importExportService: ImportExportService,
    public dialog: MatDialog) { }


  private toggleBoyCompChartEvent = new Subject<Event>();
  private nextBodyCompDateEvent = new Subject<Event>();
  private previousBodyCompDateEvent = new Subject<Event>();
  private toggleSkinfoldChartListEvent = new Subject<Event>();
  private toggleSkinfoldBodyCompeEvent = new Subject<Event>();

  @Input() toggleBodyCompChart: boolean = false
  @Input() selectorBodyCompDate: number = 1
  @Input() isShowNextBodyCompButton: boolean = false
  @Input() isToggleSkinfoldChartList: boolean = false
  @Input() toggleSkinfoldBodyComp: boolean = true;

  displayedColumns = ["method", "age", "date", "weight", "Chest", "Subscapular", "Midaxillary", "Triceps", "Bicep", "Suprailiac", "Abdominal", "Thigh"]
  displayedColumnsBody = ["method", "age", "date", "weight", "Skinfolds sum", "Body Density", "Fat Percentage", "Lean Mass", "Fat Mass"]

  dataSource = new MatTableDataSource<SkinfoldsForDB>()

  loadSkinfoldsSince: Date

  clickExportSkinfolds() {
    this.importExportService.flatSkinfoldsForDB()
  }

  toggleSkinfoldBodyCompButton(event: Event) {
    this.toggleSkinfoldBodyCompeEvent.next(event)
    this.toggleSkinfoldBodyComp = !this.toggleSkinfoldBodyComp
    this.createSkinfoldsChart()
  }

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
    if (this.selectorBodyCompDate < this.dummyDataService.dummyArraySkinfolds.length) {
      this.selectorBodyCompDate += 1
      this.createBodyCompositionTile(this.selectorBodyCompDate)
      this.isShowNextBodyCompButton = true
    } else {
      const dialogRef = this.dialog.open(LoadMoreSkinfoldComponent, {
        data: { measurementDate: this.loadSkinfoldsSince }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(result );
      })
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
    let chartData = this.chartsService.skinfoldLineChartData(this.localDummyArray)
    if (this.toggleSkinfoldBodyComp) {
      this.lineChartData = chartData.skinfoldChartDataSet
      this.lineChartLabels = chartData.skinfoldXaxisLabel
      this.lineChartOptions = this.chartsService.lineChartOption("Skinfold", "Body weight", chartData.maxSkinfold)
      this.lineChartLegend = this.chartsService.lineChartLegend
      this.lineChartType = this.chartsService.lineChartType
    } else {
      this.lineChartData = chartData.bodyCompostitionDataSet
      this.lineChartLabels = chartData.skinfoldXaxisLabel
      this.lineChartOptions = this.chartsService.dualChartOption("Kg ( Weight, Lean mass, fat maas )", "g/cc ( Body density )", "mm ( Skinfolds sum )", true, chartData.maxSkinfold + 10, chartData.maxWeight, chartData.maxBodyDensity)
      this.lineChartLegend = this.chartsService.lineChartLegend
      this.lineChartType = this.chartsService.lineChartType
    }
     this.dataSource.data = this.localDummyArray
  }

  createBodyCompositionTile(n: number) {

    let localDummyArrayLastElement = this.localDummyArray[this.localDummyArray.length - n]
    this.method = localDummyArrayLastElement.metadata.method
    this.date = localDummyArrayLastElement.metadata.date
    this.sum = localDummyArrayLastElement.bodyResult.skinfoldsSum
    this.weight = localDummyArrayLastElement.metadata.weight
    this.age = localDummyArrayLastElement.metadata.age
    this.bodyDensity = localDummyArrayLastElement.bodyResult.bodyDensity
    this.bodyFatPercentage = localDummyArrayLastElement.bodyResult.bodyFatPercentage

    if (this.selectorBodyCompDate < this.dummyDataService.dummyArraySkinfolds.length) {
      let localDummyArrayLastSecondElement = this.localDummyArray[this.localDummyArray.length - n - 1]
      let sumSecondlast = localDummyArrayLastSecondElement.bodyResult.skinfoldsSum
      let bodyDensitySecondlast = localDummyArrayLastSecondElement.bodyResult.bodyDensity
      let bodyFatPercentageSecondlast = localDummyArrayLastSecondElement.bodyResult.bodyFatPercentage
      this.sum > sumSecondlast ? this.isSumIncreasing = true : this.isSumIncreasing = false
      this.bodyDensity > bodyDensitySecondlast ? this.isBodyDensityIncreasing = true : this.isBodyDensityIncreasing = false
      this.bodyFatPercentage > bodyFatPercentageSecondlast ? this.isBodyFatPercentageIncreasing = true : this.isBodyFatPercentageIncreasing = false
    }

    let foldSkinTitleArray = Object.keys(localDummyArrayLastElement.fold)
    let foldSkinValueArray = Object.values(localDummyArrayLastElement.fold)

    if (this.toggleBodyCompChart) {
      this.barChartData = this.chartsService.barChartData(foldSkinValueArray, '')
      this.barChartLabels = this.chartsService.barChartLabels(foldSkinTitleArray)
      this.barChartOptions = this.chartsService.barChartOptions
      this.barChartPlugins = this.chartsService.barChartPlugins
      this.barChartLegend = this.chartsService.barChartLegend
      this.barChartType = this.chartsService.barChartType
    } else {
      this.pieChartOptions = this.chartsService.pieChartOptions
      this.pieChartLabels = this.chartsService.pieChartLabels
      this.pieChartData = this.chartsService.pieDataChart(localDummyArrayLastElement.bodyResult.fatMass, localDummyArrayLastElement.bodyResult.leanMass)
      this.pieChartType = this.chartsService.pieChartType
      this.pieChartLegend = this.chartsService.pieChartLegend
      this.pieChartPlugins = this.chartsService.pieChartPlugins
      this.pieChartColors = this.chartsService.pieChartColors
    }
  }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {

    if (this.dummyDataService.dummyArraySkinfolds.length == 0) { this.dummyDataService.createSkinfold() }
    let localDummyArray = [...this.dummyDataService.dummyArraySkinfolds]
    let localDummyArrayLoc = [...localDummyArray].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())
    this.localDummyArray = localDummyArrayLoc
    this.createSkinfoldsChart()
    this.createBodyCompositionTile(1)
  }

}

