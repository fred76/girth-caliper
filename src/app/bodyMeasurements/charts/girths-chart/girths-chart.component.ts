import { ImportExportService } from './../../../Services/import-export.service';
import { Girths } from './../../../interface-model/girths.model';
import { Subject } from 'rxjs';
import { ChartService } from '../../../Services/chart.service';
import { DummyDataService } from '../../../Utility/dummyData.service';

import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-girths-chart',
  template: `
  <mat-card class="mat-elevation-z8" > <mat-card-title>
    <div fxLayout="row" fxLayout="row" fxLayout.lt-sm="column" fxLayoutAlign="space-between center">
      <p class="mat-subheading-2">Girths trend over the body weight</p>
      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px">

        <div fxLayout.lt-sm="row" fxLayoutGap="16px">
          <button mat-mini-fab color="primary" (click)="toggleSkinfoldChartListButton($event)" class="button24">
            <mat-icon *ngIf="!isToggleSkinfoldChartList" class="icon24Bis">reorder_black</mat-icon>
            <mat-icon *ngIf="isToggleSkinfoldChartList" class="icon24Bis">timeline_black</mat-icon>
          </button>

          <button mat-mini-fab color="primary" (click)="clickExportSkinfolds()"  class="button24"
            matTooltip="Download xlsx file">
            <mat-icon class="icon24Bis">save_alt</mat-icon>
          </button>
        </div>
      </div>
    </div>
  </mat-card-title>
  <canvas *ngIf="!isToggleSkinfoldChartList" baseChart
  [datasets]="lineChartData"
  [labels]="lineChartLabels"
  [options]="lineChartOptions"
  [legend]="lineChartLegend"
  [chartType]="lineChartType"
  (chartHover)="chartHovered($event)"
  (chartClick)="chartClicked($event)">
  </canvas>

  <div *ngIf="isToggleSkinfoldChartList">
      <mat-table  [dataSource]="dataSource">
        <ng-container matColumnDef="Date">
          <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.date | date:'d MMM yy'}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Body weight">
          <mat-header-cell *matHeaderCellDef>Body weight</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.weight}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Neck">
          <mat-header-cell *matHeaderCellDef>Neck</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.neck}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Chest">
          <mat-header-cell *matHeaderCellDef>Chest</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.chest}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Bicep Rigth">
          <mat-header-cell *matHeaderCellDef>Bicep Rigth</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.bicep_R}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Bicep Left">
          <mat-header-cell *matHeaderCellDef>Bicep Left</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.bicep_L}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Bicep Relaxed Rigth">
          <mat-header-cell *matHeaderCellDef>Bicep Relaxed Rigth</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.bicep_R_Relax}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Bicep Relaxed Left">
          <mat-header-cell *matHeaderCellDef>Bicep Relaxed Left</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.bicep_L_Relax}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Forearm Rigth">
          <mat-header-cell *matHeaderCellDef>Forearm Rigth</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.forearm_R}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Forearm Left">
          <mat-header-cell *matHeaderCellDef>Forearm Left</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.forearm_L}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Wrist">
          <mat-header-cell *matHeaderCellDef>Wrist</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.wrist}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Waist">
          <mat-header-cell *matHeaderCellDef>Waist</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.waist}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Hips">
          <mat-header-cell *matHeaderCellDef>Hips</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.hips}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Thigt Rigth">
          <mat-header-cell *matHeaderCellDef>Thigt Rigth</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.thigh_R}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Thigt Left">
          <mat-header-cell *matHeaderCellDef>Thigt Left</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.thigh_L}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Calf Rigth">
          <mat-header-cell *matHeaderCellDef>Calf Rigth</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.calf_R}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="Calf Left">
          <mat-header-cell *matHeaderCellDef>Calf Left</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.calf_L}}</mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
</mat-card>  `,

  styles: [`
   .mat-elevation-z8 { margin: 10px; padding: 10px; }  .mat-elevation-z4 { margin: 10px; padding: 10px; }
   .icon24Bis { font-family: "Material Icons" !important; font-size: 16px; margin-top: -10px; margin-left: 3px;}
   .button24 { width: 24px;  height: 24px;}`],
  encapsulation: ViewEncapsulation.None
})

export class GirthsChartComponent implements OnInit {
  showChart: boolean
  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService,
    private importExportService: ImportExportService) { }

  lineChartData: any[]
  lineChartLabels: any[]
  lineChartOptions: any
  lineChartColors: any[]
  lineChartLegend: boolean
  lineChartType: any

  private toggleSkinfoldChartListEvent = new Subject<Event>();
  @Input() isToggleSkinfoldChartList: boolean = false
  dataSource = new MatTableDataSource<Girths>()

  displayedColumns = ["Date", "Body weight", "Neck", "Chest", "Bicep Rigth", "Bicep Left", "Bicep Relaxed Rigth", "Bicep Relaxed Left", "Forearm Rigth", "Forearm Left", "Wrist", "Waist", "Hips", "Thigt Rigth", "Thigt Left", "Calf Rigth", "Calf Left"]

  toggleSkinfoldChartListButton(event: Event) {
    this.toggleSkinfoldChartListEvent.next(event);
    this.isToggleSkinfoldChartList = !this.isToggleSkinfoldChartList
  }

  clickExportSkinfolds() {
    this.importExportService.flatGirthsForDB()
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {
    if (this.dummyDataService.dummyArray.length == 0) { this.dummyDataService.createGirth() }
    let localDummyArray = [...this.dummyDataService.dummyArray]
    let girthsCharLineData = this.chartsService.girthLineChartData(localDummyArray)
    this.lineChartData = girthsCharLineData.arrayChartDataSet
    this.lineChartLabels = this.chartsService.lineChartLabels
    this.lineChartOptions = this.chartsService.lineChartOption("Girths", "Body weight", girthsCharLineData.maxWeight)
    this.lineChartLegend = this.chartsService.lineChartLegend
    this.lineChartType = this.chartsService.lineChartType
    this.dataSource.data = localDummyArray
  }
}

