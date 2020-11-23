import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ConfirmSkinfold',
  template: `<h1 mat-dialog-title>Skin Folds!</h1>
            <mat-dialog-content>
              <p *ngIf="!passedData.isAllSet">following folds are not set:</p>

               <p> {{ passedData.list }} </p>

            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-button [mat-dialog-close]="false">Ok</button>
            </mat-dialog-actions>`
})
export class ConfirmSkinfoldComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
