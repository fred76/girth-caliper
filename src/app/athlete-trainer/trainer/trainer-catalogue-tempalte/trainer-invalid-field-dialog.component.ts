import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-trainer-invalid-field-dialog',
  templateUrl: './trainer-invalid-field-dialog.component.html',
  styleUrls: ['./trainer-invalid-field-dialog.component.css']
})
export class TrainerInvalidFieldDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData,
    private dialogRef: MatDialogRef<TrainerInvalidFieldDialogComponent>
  ) { }


  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  later() {
    const data = {
      abort: false
    }
    this.dialogRef.close(data);
  }

}
