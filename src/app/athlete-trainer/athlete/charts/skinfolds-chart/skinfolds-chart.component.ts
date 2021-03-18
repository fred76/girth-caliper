import { ChartFeederService } from '../chart-feeder.service';

import { SkinfoldsForDB } from '../../../../interface-model/skinfold.model';
import { ChartContainerComponent } from '../chart-container.component';

import { MatDialog } from '@angular/material/dialog';
import { ImportExportService } from '../../../../Services/import-export.service';
import { Subject, Subscription, Observable } from 'rxjs';
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
    public chartFeederService: ChartFeederService,
    private importExportService: ImportExportService,
    private chartContainerComponent: ChartContainerComponent) { }
  private toggleSkinfoldChartListEvent = new Subject<Event>();
  private toggleSkinfoldBodyCompeEvent = new Subject<Event>();

  @Input() toggleBodyCompChart: boolean = true
  @Input() selectorBodyCompDate: number = 0
  @Input() isShowNextBodyCompButton: boolean = false
  @Input() isToggleSkinfoldChartList: boolean = false
  @Input() toggleSkinfoldBodyComp: boolean = true;

  displayedColumns = ["method", "age", "date", "weight", "Chest", "Subscapular", "Midaxillary", "Triceps", "Bicep", "Suprailiac", "Abdominal", "Thigh", "Option"]
  displayedColumnsBody = ["method", "age", "date", "weight", "Skinfolds sum", "Body Density", "Fat Percentage", "Lean Mass", "Fat Mass"]

  showChart: boolean
  show: boolean = true
  skinfoldsToAdd: number = 0
  private exchangeSubscription: Subscription

  SkinfoldsArray: SkinfoldsForDB[] = []

  dataSource = new MatTableDataSource<SkinfoldsForDB>()

  loadSkinfoldsSince: Date

  lineChartSkinfoldsBodyComposition: Chart

  pieBarBodyComposition: Chart

  clickExportSkinfolds() {
    this.importExportService.flatSkinfoldsForDB(this.SkinfoldsArray)
  }

  toggleSkinfoldBodyCompButton(event: Event) {
    this.toggleSkinfoldBodyCompeEvent.next(event)
    this.toggleSkinfoldBodyComp = !this.toggleSkinfoldBodyComp

    this.lineChartSkinfoldsBodyComposition.destroy()
    if (!this.toggleSkinfoldBodyComp) {
      this.lineChartSkinfoldsBodyComposition = this.chartFeederService.lineChartBodyDensity(this.SkinfoldsArray)
    } else {
      this.lineChartSkinfoldsBodyComposition = this.chartFeederService.lineChartSkinfolds(this.SkinfoldsArray)
    }

  }
  ngOnInit(): void {

    this.exchangeSubscription = this.chartContainerComponent.skinfoldsSubj.subscribe((s: SkinfoldsForDB[]) => {
      this.show = false
      let localSkinfoldObject = [...s].sort((d2, d1) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())

      this.SkinfoldsArray = localSkinfoldObject
      this.dataSource.data = localSkinfoldObject
      this.lineChartSkinfoldsBodyComposition = this.chartFeederService.lineChartSkinfolds(localSkinfoldObject)

    })
    this.pieBarBodyComposition = this.chartFeederService.pieChart(
      this.SkinfoldsArray[this.selectorBodyCompDate].bodyResult.fatMass,
      this.SkinfoldsArray[this.selectorBodyCompDate].bodyResult.leanMass)
  }

  toggleSkinfoldChartListButton(event: Event) {
    this.toggleSkinfoldChartListEvent.next(event);
    this.isToggleSkinfoldChartList = !this.isToggleSkinfoldChartList
  }

  loadMoreSkinfolds() {
    this.skinfoldsToAdd += 2
    this.chartContainerComponent.skinfoldArraySize.next(this.skinfoldsToAdd)
  }

  toggleBodyCompChartButton(event: Event) {
    this.toggleBodyCompChart = !this.toggleBodyCompChart
    this.shiftMiniChartData()
  }

  shiftMiniChartData() {
    this.pieBarBodyComposition.destroy()
    if (this.toggleBodyCompChart) {
      this.pieBarBodyComposition = this.chartFeederService.pieChart(
        this.SkinfoldsArray[this.selectorBodyCompDate].bodyResult.fatMass,
        this.SkinfoldsArray[this.selectorBodyCompDate].bodyResult.leanMass)
    } else {
      let foldSkinTitleArray = Object.keys(this.SkinfoldsArray[this.selectorBodyCompDate].fold)
      let foldSkinValueArray = Object.values(this.SkinfoldsArray[this.selectorBodyCompDate].fold)
      this.pieBarBodyComposition = this.chartFeederService.barChart(foldSkinValueArray, foldSkinTitleArray)
    }
  }

  previousBodyCompChartButton(event: Event) {
    this.selectorBodyCompDate += 1
    this.shiftMiniChartData()
  }

  nextBodyCompChartButton(event: Event) {
    this.selectorBodyCompDate -= 1
    this.shiftMiniChartData()
  }

  deleteSkinfold(id: string, index: number) {
    this.SkinfoldsArray.splice(index, 1)
    this.dataSource._updateChangeSubscription()
    this.chartContainerComponent.deleteSkinfold(id)
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void { }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void { }


  ngOnDestroy(): void {
    this.exchangeSubscription.unsubscribe()
  }

}

