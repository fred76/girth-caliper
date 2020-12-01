import { FireDatabaseService } from './../../../Services/fire-database.service';
import { ChartService } from './../../../Services/chart.service';
import { LoadMoreSkinfoldComponent } from './loadMoreSkinfold';
import { MatDialog } from '@angular/material/dialog';
import { ImportExportService } from './../../../Services/import-export.service';
import { Subject, Subscription } from 'rxjs';
import { DummyDataService } from '../../../Utility/dummyData.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SkinfoldsForDB } from 'src/app/interface-model/skinfold.model';
@Component({
  selector: 'app-skinfolds-chart',
  templateUrl: './skinfolds-chart.component.html',

  styleUrls: ['./skinfolds-chart.component.css']
})
export class SkinfoldsChartComponent implements OnInit, OnDestroy {

  showChart: boolean
  constructor(
    private chartsService: ChartService,
    private importExportService: ImportExportService,
    public dialog: MatDialog,
    private fireDatabaseService: FireDatabaseService) { }


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

  dataSource = new MatTableDataSource<SkinfoldsForDB>()

  loadSkinfoldsSince: Date

  lineChartSkinfoldsBodyComposition: any

  pieBarBodyComposition: any

  clickExportSkinfolds() {
    this.importExportService.flatSkinfoldsForDB()
  }

  toggleSkinfoldBodyCompButton(event: Event) {
    this.toggleSkinfoldBodyCompeEvent.next(event)
    this.toggleSkinfoldBodyComp = !this.toggleSkinfoldBodyComp
    let s = this.chartsService.skinfoldLineChartData(this.localDummyArray)
    this.chartsService.UpdateLineChartSkinfolds(this.lineChartSkinfoldsBodyComposition, s.bodyCompostitionDataSet, s.maxSkinfold + 10, s.maxWeight, s.maxBodyDensity)
  }

  toggleSkinfoldChartListButton(event: Event) {
    this.toggleSkinfoldChartListEvent.next(event);
    this.isToggleSkinfoldChartList = !this.isToggleSkinfoldChartList

  }

  toggleBodyCompChartButton(event: Event) {
    this.toggleBoyCompChartEvent.next(event);
    this.toggleBodyCompChart = !this.toggleBodyCompChart
    this.createBodyCompositionTile(this.selectorBodyCompDate, this.localDummyArray)
  }

  previousBodyCompChartButton(event: Event) {
    this.previousBodyCompDateEvent.next(event);

    if (this.selectorBodyCompDate < this.localDummyArray.length) {
      this.selectorBodyCompDate += 1
      this.createBodyCompositionTile(this.selectorBodyCompDate, this.localDummyArray)
      this.isShowNextBodyCompButton = true
    } else {
      const dialogRef = this.dialog.open(LoadMoreSkinfoldComponent, {
        data: { measurementDate: this.loadSkinfoldsSince }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      })
    }
    this.createBodyCompositionTile(this.selectorBodyCompDate, this.localDummyArray)
  }

  nextBodyCompChartButton(event: Event) {
    this.nextBodyCompDateEvent.next(event);
    if (this.selectorBodyCompDate > 1) {
      this.selectorBodyCompDate -= 1
      this.createBodyCompositionTile(this.selectorBodyCompDate, this.localDummyArray)
    } else {
      this.isShowNextBodyCompButton = false
    }
  }

  localDummyArray: SkinfoldsForDB[] = []

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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  createBodyCompositionTile(n: number, skinfoldsArray: SkinfoldsForDB[]) {

    let localDummyArrayLastElement = skinfoldsArray[skinfoldsArray.length - n]
    this.method = localDummyArrayLastElement.metadata.method
    this.date = localDummyArrayLastElement.metadata.date
    this.sum = localDummyArrayLastElement.bodyResult.skinfoldsSum
    this.weight = localDummyArrayLastElement.metadata.weight
    this.age = localDummyArrayLastElement.metadata.age
    this.bodyDensity = localDummyArrayLastElement.bodyResult.bodyDensity
    this.bodyFatPercentage = localDummyArrayLastElement.bodyResult.bodyFatPercentage

    if (this.selectorBodyCompDate < this.localDummyArray.length) {
      let localDummyArrayLastSecondElement = skinfoldsArray[skinfoldsArray.length - n - 1]
      let sumSecondlast = localDummyArrayLastSecondElement.bodyResult.skinfoldsSum
      let bodyDensitySecondlast = localDummyArrayLastSecondElement.bodyResult.bodyDensity
      let bodyFatPercentageSecondlast = localDummyArrayLastSecondElement.bodyResult.bodyFatPercentage
      this.sum > sumSecondlast ? this.isSumIncreasing = true : this.isSumIncreasing = false
      this.bodyDensity > bodyDensitySecondlast ? this.isBodyDensityIncreasing = true : this.isBodyDensityIncreasing = false
      this.bodyFatPercentage > bodyFatPercentageSecondlast ? this.isBodyFatPercentageIncreasing = true : this.isBodyFatPercentageIncreasing = false
    }

    let foldSkinTitleArray = Object.keys(localDummyArrayLastElement.fold)
    let foldSkinValueArray = Object.values(localDummyArrayLastElement.fold)

    this.barChartData = this.chartsService.barChartData(foldSkinValueArray)
    this.barChartLabels = this.chartsService.barChartLabels(foldSkinTitleArray)
    this.barChartOptions = this.chartsService.barChartOptions
    this.barChartPlugins = this.chartsService.barChartPlugins
    this.barChartLegend = this.chartsService.barChartLegend
    this.barChartType = this.chartsService.barChartType

    this.pieChartOptions = this.chartsService.pieChartOptions
    this.pieChartLabels = this.chartsService.pieChartLabels
    this.pieChartData = this.chartsService.pieDataChart(localDummyArrayLastElement.bodyResult.fatMass, localDummyArrayLastElement.bodyResult.leanMass)
    this.pieChartType = this.chartsService.pieChartType
    this.pieChartPlugins = this.chartsService.pieChartPlugins
    this.pieChartColors = this.chartsService.pieChartColors

  }
  show: boolean = true
  private exchangeSubscription: Subscription
  ngOnInit(): void {
    // this.dummyDataService.createSkinfold()
    this.exchangeSubscription = this.fireDatabaseService.skinfoldsSubj.subscribe((skinFolds: SkinfoldsForDB[]) => {
      this.dataSource.data = skinFolds
      if (skinFolds) {
        this.show = false
        this.localDummyArray = skinFolds
        this.createBodyCompositionTile(1, skinFolds)
        let s = this.chartsService.skinfoldLineChartData(skinFolds)
        this.lineChartSkinfoldsBodyComposition = this.chartsService.lineChartSkinfolds(s.skinfoldChartDataSet, s.skinfoldXaxisLabel, s.maxSkinfold, s.maxWeight)
      }
    })
    this.fireDatabaseService.fetchAvailableSkinfolds()
  }

  ngOnDestroy(): void {
    if (this.exchangeSubscription) {
      this.exchangeSubscription.unsubscribe()
    }
  }

  /*
 createSkinfoldsChart() {
    this.chartsService.skinfoldLineChartData(this.localDummyArray)
    this.chartsService.geMessage().subscribe(e => {
      this.lineChartData = e.skinfoldChartDataSet
    this.lineChartLabels = e.skinfoldXaxisLabel
    this.lineChartOptions = this.chartsService.lineChartOption("Skinfold ( mm )", "Body weight ( Kg )", e.maxSkinfold)
    this.lineChartLegend = this.chartsService.lineChartLegend
    this.lineChartType = this.chartsService.lineChartType

    this.lineDualChartData = e.bodyCompostitionDataSet
    this.lineDualChartLabels = e.skinfoldXaxisLabel
    this.lineDualChartOptions = this.chartsService.dualChartOption("Weight, Lean mass, Fat maas ( Kg )", "Body density ( g/cc )", "Skinfolds sum ( mm )", true, e.maxSkinfold + 10, e.maxWeight, e.maxBodyDensity)
    this.lineDualChartLegend = this.chartsService.lineChartLegend
    this.lineDualChartType = this.chartsService.lineChartType
    })



    this.dataSource.data = this.localDummyArray
  }
  */
}

