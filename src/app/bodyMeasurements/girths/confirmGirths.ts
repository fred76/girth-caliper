import { DialogData } from './girths.component';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ConfirmGirths',
  template: `<h1 mat-dialog-title>Girths!</h1>
 <mat-dialog-content>
              <p *ngIf="!passedData.isAllSet">Some Girths are not set</p>
              <p *ngIf="passedData.isAllSet">Great job! You take all measures</p>
              <p *ngIf="passedData.isAllSet">select date and save</p>
              <p> {{ passedData.listOfZeroGirths }} </p>
              <p *ngIf="!passedData.isAllSet">do You like save anyway?</p>
 </mat-dialog-content>
   <mat-dialog-content>
    <span *ngIf="passedData.isAllSet" fxLayoutAlign="center" fxLayoutAlign.xs="end" >
    <mat-form-field  class="date-field">
      <input matInput placeholder="Measurement date" [matDatepicker]="picker" [(ngModel)]="passedData.measurementDate" name="measurementDate" required>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
     </mat-form-field>
  </span>
  </mat-dialog-content>
   <mat-dialog-actions>
       <button mat-button [disabled]="!passedData.measurementDate"   [mat-dialog-close] ="passedData.measurementDate">Save</button>
      <button mat-button [mat-dialog-close]="false">Back</button>
   </mat-dialog-actions>`
})
export class ConfirmGirthsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
