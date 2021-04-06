import { TrainerPage } from './../../../interface-model/trainer';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trainer-page-dialog',
  templateUrl: './trainer-page-dialog.component.html',
  styleUrls: ['./trainer-page-dialog.component.css']
})
export class TrainerPageDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData,
    private dialogRef: MatDialogRef<TrainerPageDialogComponent>
  ) { }

  imgURL: string
  imgURLDefaultCoverImage = "/assets//accessory/box1.jpg"
  isEditMode: boolean = false
  isImgSelected: boolean
  isImgSelected64: any

  imgSelected(imgSelected: boolean) {
    this.isImgSelected = imgSelected
  }

  imgSelected64(imgSelected64: any) {
    this.isImgSelected64 = imgSelected64
  }

  imgURLAssignedCoverImage(imgURL: string) {
    this.imgURL = imgURL
    const data: TrainerPage = {
      backgroundImageURL: this.imgURL,
      // index: this.index
    }
    this.isEditMode = false
    this.dialogRef.close(data);
  }

  ngOnInit() {

    console.log("this.passedData.isEditMode");
    console.log(this.passedData.isEditMode);


    if (this.passedData.isEditMode) {
      this.imgURLDefaultCoverImage = this.passedData.coverImageURL
      this.isEditMode = true
    }
  }

  save() {
    console.log("PPP");

    const data = {
      img64: this.isImgSelected64,
      isOldImageToBeDeleted: this.isEditMode,
      oldURL: this.imgURLDefaultCoverImage
    }
    this.isEditMode = false
    this.dialogRef.close(data);
  }

  close() {
    this.isEditMode = false
    this.dialogRef.close();
  }

}
