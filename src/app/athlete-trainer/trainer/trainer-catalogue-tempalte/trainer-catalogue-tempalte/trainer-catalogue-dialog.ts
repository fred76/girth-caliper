import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trainerCatalogueDialog',
  templateUrl: './trainer-catalogue-dialog.html',
  styleUrls: ['./trainer-catalogue-dialog.css'],
})
export class trainerCatalogueDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    private fb: FormBuilder,




    private dialogRef: MatDialogRef<trainerCatalogueDialogComponent>,) {
    this.form = fb.group({
      titleCard: ["", Validators.required],
      subTitleCard: ["", Validators.required],
      descripition: ["", Validators.required],
      tags: ["", Validators.required],
      price: ["", Validators.required]
    });
    this.index = passedData.index
  }

  index : number
  form: FormGroup
  imgURL: string
  imgURLAssigned(imgURL: string) {
    this.imgURL = imgURL
  }

ngOnInit(): void {

}

  save() {
    const data = {
      index : this.index,
      imgURL: this.imgURL,
      titleCard: this.form.value.titleCard,
      subTitleCard: this.form.value.subTitleCard,
      descripition: this.form.value.descripition,
      tags: this.form.value.tags,
      price: this.form.value.price
    }

    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}


