import { ImageLoaderComponent } from './../../../ui-utility/image-loader/image-loader.component';
import { TrainerProduct } from './../../../interface-model/trainer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trainerCatalogueDialog',
  templateUrl: './trainer-catalogue-dialog.html',
  styleUrls: ['./trainer-catalogue-dialog.css'],
})
export class TrainerCatalogueDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TrainerCatalogueDialogComponent>
  ) { }

  @ViewChild(ImageLoaderComponent) imgLoader: ImageLoaderComponent

  // index: number
  form: FormGroup
  imgURL: string
  isImgSelected
  imgURLDefault = "/assets//accessory/box1.jpg"
  isEditMode: boolean = false
  oldImageURL: string

  imgURLAssigned(imgURL: string) {
    this.imgURL = imgURL
  }

  imgSelected(imgSelected: boolean) {
    this.isImgSelected = imgSelected
  }

  ngOnInit(): void {

    if (this.passedData.product) {
      this.isEditMode = true
      this.imgURLDefault = this.passedData.product.imgURL
      // this.index = this.passedData.product.index
      this.imgURLAssigned(this.passedData.product.imgURL)
      this.form = this.fb.group({
        titleCard: [this.passedData.product.titleCard, Validators.required],
        subTitleCard: [this.passedData.product.subTitleCard, Validators.required],
        descripition: [this.passedData.product.descripition, Validators.required],
        tags: [this.passedData.product.tags, Validators.required],
        price: [this.passedData.product.price, Validators.required]
      });
    } else {
      // this.index = this.passedData.index
      this.form = this.fb.group({
        titleCard: ["", Validators.required],
        subTitleCard: ["", Validators.required],
        descripition: ["", Validators.required],
        tags: ["", Validators.required],
        price: ["", Validators.required]
      });
    }
  }

  async save() {
    await this.imgLoader.preparePhotoSession().subscribe(p => {
      const data: TrainerProduct = {
        imgURL: p,
        titleCard: this.form.value.titleCard,
        subTitleCard: this.form.value.subTitleCard,
        descripition: this.form.value.descripition,
        price: this.form.value.price,
        tags: this.form.value.tags,
        cratedON: Date(),
        // index: this.index
      }
      this.isEditMode = false
      this.dialogRef.close(data);
    })

  }

  close() {
    this.isEditMode = false
    this.dialogRef.close();
  }
}


