import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-LoadMoreSkinfold',
  template: `
   <mat-dialog-content>
     <mat-form-field >
      <input matInput placeholder="Load skinfolds since" [matDatepicker]="picker"
      [(ngModel)]="passedData.loadSkinfoldsSince" name="loadSkinfoldsSince" >
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
     </mat-form-field>
   </mat-dialog-content>
     <mat-dialog-actions>
       <button mat-button [mat-dialog-close]="passedData.loadSkinfoldsSince">Load</button>
       <button mat-button [mat-dialog-close]="false">Cancel</button>
     </mat-dialog-actions>`
})
export class LoadMoreSkinfoldComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
