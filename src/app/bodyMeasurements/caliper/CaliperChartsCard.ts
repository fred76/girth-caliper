import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-CaliperChartsCard',
  styles: [`.cont{height: 400px}`],
  template: `<h1 mat-dialog-title>Skin Folds: {{passedData.method}}</h1>
  <h5>Body weight: {{passedData.bodyWeight}} Kg</h5>
  <h5>Body density: {{passedData.bodyDensity}} g/cc</h5>
  <h5>Body fat Percentage: {{passedData.bodyFatPercentage}} %</h5>
  <h5>Skinfold sum: {{passedData.sum}} mm</h5>
   <mat-dialog-content >
      <div  >
       <canvas baseChart height="40vh" width="80vw"
         [datasets]="passedData.barChartData"
         [labels]="passedData.barChartLabels"
         [options]="passedData.barChartOptions"
         [plugins]="passedData.barChartPlugins"
         [legend]="passedData.barChartLegend"
         [chartType]="passedData.barChartType">
       </canvas>
     </div>

     <div >
      <canvas baseChart height="40vh" width="80vw"
       [data]="passedData.pieChartData"
       [chartType]="passedData.pieChartType"
       [labels]="passedData.pieChartLabels"
       [options]="passedData.pieChartOptions"
       [plugins]="passedData.pieChartPlugins"
       [colors]="passedData.pieChartColors"
       [legend]="passedData.pieChartLegend">
      </canvas>
    </div>
   </mat-dialog-content>
   <mat-divider style="margin: 20px"></mat-divider>
   <mat-dialog-content>
    <span fxLayoutAlign="center" fxLayoutAlign.xs="end" >
    <mat-form-field  class="date-field">
      <input matInput placeholder="Measurement date" [matDatepicker]="picker" [(ngModel)]="passedData.measurementDate" name="measurementDate" required>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
     </mat-form-field>
  </span>
  </mat-dialog-content>
  <mat-divider style="margin: 20px"></mat-divider>
     <mat-dialog-actions>
   <button mat-button [mat-dialog-close]="false">Back</button>
   <button mat-button [disabled]="!passedData.measurementDate" [mat-dialog-close] ="passedData.measurementDate">Save</button>
    </mat-dialog-actions>`
})
export class CaliperChartsCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
