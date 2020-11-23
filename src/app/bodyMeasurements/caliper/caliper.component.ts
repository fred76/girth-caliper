import { ChartService } from './../../Services/chart.service';

import { CaliperChartsCardComponent } from './CaliperChartsCard';

import { ConfirmCaliperComponent } from './confirmCaliper';
import { CaliperService } from '../../Services/caliper.service';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

import { Utility } from 'src/app/Utility/utility';

@Component({
  selector: 'app-caliper',
  templateUrl: './caliper.component.html',
  styleUrls: ['./caliper.component.css']
})
export class CaliperComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    private measurementsService: CaliperService,
    private utility: Utility,
    private chartService: ChartService) { }

  caliperTiles = []
  caliperTilesDescriptions = []
  caliperMethods = this.measurementsService.caliperMethods
  selectedCaliperMethod: string
  measurementDate: Date
  bodyWeight: number = 90
  userAge: number = 44

  ngOnInit(): void {
    this.measurementsService.selectedCaliperMethodSubs()
  }

  ngOnDestroy() {
    this.measurementsService.selectedCaliperMethodUnsubscribe()
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }


  eventCaliperMethodChange(s, event) {
    this.measurementsService.updateSelectedCaliperMethod(this.selectedCaliperMethod)
    this.caliperTiles = this.measurementsService.caliperTiles
    this.caliperTilesDescriptions = this.measurementsService.caliperTilesDescriptions
  }


  save() {
    let isAllSet: boolean = false
    const zeroMeasure = []
    let listOfZeroFolds = ""
    this.caliperTiles.map(fold => {
      if (fold.value1 === null) {
        zeroMeasure.push(fold.title)
        isAllSet = false
      } else {
        isAllSet = true
      }
    })
    if (!isAllSet) {
      listOfZeroFolds = zeroMeasure.join("; ")
      const dialogRef = this.dialog.open(ConfirmCaliperComponent, {
        data: {
          isAllSet: isAllSet,
          list: listOfZeroFolds,
          measurementDate: this.measurementDate
        }
      });
    } else {
      let foldSkin = this.measurementsService.createSkinFoldObject(this.selectedCaliperMethod, this.userAge, this.bodyWeight)
      const dialogRef = this.dialog.open(CaliperChartsCardComponent, {
        data: {
          method: this.selectedCaliperMethod,
          bodyWeight: this.bodyWeight,
          bodyDensity: this.utility.numberDecimal(foldSkin.bodyDensity, 2),
          bodyFatPercentage: this.utility.numberDecimal(foldSkin.bodyFatPerc, 2),
          sum: this.utility.numberDecimal(foldSkin.sum, 2),

          barChartData: this.chartService.barChartData(foldSkin.foldSkinValueArray, ''),
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
          this.measurementsService.caliperObjectForDB.metadata.date = result
          this.measurementsService.saveSkinfoldToDB()

        } else {
          console.log("Non Passa")
        }
      })
    }
  }
}
