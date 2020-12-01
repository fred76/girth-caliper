import { ChartService } from '../../Services/chart.service';

import { SkinfoldsChartsCardComponent } from './SkinfoldsChartsCard';
import { ConfirmSkinfoldComponent } from './confirmSkinfolds';
import { SkinfoldsService } from '../../Services/skinfolds.service';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

import { Utility } from 'src/app/Utility/utility';

@Component({
  selector: 'app-skinfold',
  templateUrl: './skinfold.component.html',
  styleUrls: ['./skinfold.component.css']
})
export class SkinfoldComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    private skinfoldsService: SkinfoldsService,
    private utility: Utility,
    private chartService: ChartService) { }

  skinfoldsTiles = []
  skinfoldsTilesDescriptions = []
  skinfoldsMethods = this.skinfoldsService.skinfoldsMethods
  selectedSkinfoldsMethod: string
  measurementDate: Date
  bodyWeight: number = 90
  userAge: number = 44

  ngOnInit(): void {
    this.skinfoldsService.selectedSkinfoldsMethodSubs()
  }

  ngOnDestroy() {
    this.skinfoldsService.selectedSkinfoldsMethodUnsubscribe()
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  eventCaliperMethodChange(s, event) {
    this.skinfoldsService.updateSelectedSkinfoldsrMethod(this.selectedSkinfoldsMethod)
    this.skinfoldsTiles = this.skinfoldsService.skinfoldsTiles
    this.skinfoldsTilesDescriptions = this.skinfoldsService.skinfoldsTilesDescriptions
  }

  save() {
    let isAllSet: boolean = false
    const zeroMeasure = []
    let listOfZeroFolds = ""
    this.skinfoldsTiles.map(fold => {
      if (fold.value1 === null) {
        zeroMeasure.push(fold.title)
        isAllSet = false
      } else {
        isAllSet = true
      }
    })
    if (!isAllSet) {
      listOfZeroFolds = zeroMeasure.join("; ")
      const dialogRef = this.dialog.open(ConfirmSkinfoldComponent, {
        data: {
          isAllSet: isAllSet,
          list: listOfZeroFolds,
          measurementDate: this.measurementDate
        }
      });
    } else {
      let foldSkin = this.skinfoldsService.createSkinFoldObject(this.selectedSkinfoldsMethod, this.userAge, this.bodyWeight)
      const dialogRef = this.dialog.open(SkinfoldsChartsCardComponent, {
        data: {
          method: this.selectedSkinfoldsMethod,
          bodyWeight: this.bodyWeight,
          bodyDensity: this.utility.numberDecimal(foldSkin.bodyDensity, 2),
          bodyFatPercentage: this.utility.numberDecimal(foldSkin.bodyFatPerc, 2),
          sum: this.utility.numberDecimal(foldSkin.sum, 2),

          barChartData: this.chartService.barChartData(foldSkin.foldSkinValueArray),
          barChartLabels: this.chartService.barChartLabels(foldSkin.foldSkinTitleArray),
          barChartOptions: this.chartService.barChartOptions,
          barChartPlugins: this.chartService.barChartPlugins,
          barChartLegend: this.chartService.barChartLegend,
          barChartType: this.chartService.barChartType,

          pieChartOptions: this.chartService.pieChartOptions,
          pieChartLabels: this.chartService.pieChartLabels,
          pieChartData: this.chartService.pieDataChart(this.utility.numberDecimal(foldSkin.fatMass, 2), this.utility.numberDecimal(foldSkin.leanMass, 2)),
          pieChartType: this.chartService.pieChartType,
          pieChartLegend: this.chartService.pieChartLegend,
          pieChartPlugins: this.chartService.pieChartPlugins,
          pieChartColors: this.chartService.pieChartColors
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.measurementDate = result
          console.log(result)
          this.skinfoldsService.skinfoldsObjectForDB.metadata.date = result
          this.skinfoldsService.saveSkinfoldToDB()
        } else {
          console.log("Non Passa")
        }
      })
    }
  }
}
