import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-SkinfoldChartsCard',
  styles: [`.cont{height: 400px}`],
  template: `
  <p class="mat-subheading-2" mat-dialog-title>Skin Folds: {{passedData.method}}</p>
  <div fxLayout="row" fxLayout="row" fxLayoutAlign="space-between center">

  <div fxLayout="column" fxLayoutAlign="center start">
  <p style="line-height:1.1" class="mat-small" >Body weight: {{passedData.bodyWeight}} Kg</p>
  <p style="line-height:1.1"  class="mat-small" >Body density: {{passedData.bodyDensity}} g/cc</p>
</div>
  <div fxLayout="column" fxLayoutAlign="center end">
  <p style="line-height:1.1"  class="mat-small" >Body fat Percentage: {{passedData.bodyFatPercentage}} %</p>
  <p style="line-height:1.1"  class="mat-small" >Skinfold sum: {{passedData.sum}} mm</p>
</div>
</div>
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
      <input matInput placeholder="Measurement date" [matDatepicker]="picker"
      [(ngModel)]="passedData.measurementDate" name="measurementDate" required>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
     </mat-form-field>
  </span>
  </mat-dialog-content>
     <mat-dialog-actions>
   <button mat-button [mat-dialog-close]="false">Back</button>
   <button mat-button [disabled]="!passedData.measurementDate" [mat-dialog-close] ="passedData.measurementDate">Save</button>
    </mat-dialog-actions>`
})
export class SkinfoldsChartsCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
