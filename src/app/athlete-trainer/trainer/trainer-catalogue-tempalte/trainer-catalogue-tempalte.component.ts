import { last, concatMap } from 'rxjs/operators';
import { base64ToFile } from 'ngx-image-cropper';
import { TrainerInvalidFieldDialogComponent } from './trainer-invalid-field-dialog.component';
import { TrainerPageDialogComponent } from './trainer-page-dialog.component';
import { TrainerPage, TrainerProduct } from './../../../interface-model/trainer';
import { AuthService } from './../../../auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { TrainerCatalogueDialogComponent } from './trainer-catalogue-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-trainer-catalogue-tempalte',
  templateUrl: './trainer-catalogue-tempalte.component.html',
  styleUrls: ['./trainer-catalogue-tempalte.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TrainerCatalogueTempalteComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private fireDatabaseService: FireDatabaseService,
    private storage: AngularFireStorage) { }



  cataloguTemplateArray$: Observable<TrainerProduct[]>
  trainerPageData$: Observable<TrainerPage>
  isCoverImageAllreadySet: boolean = false
  pageID: string
  url: any = "assets/accessory/crossfit.jpg"
  downloadURL$: Observable<string>
  isPageEditMode: boolean = false
  isPageExist: boolean = false
  isOldImageToBeDeleted: boolean = false
  oldURL: string
  editButtonText: string = "Edit intro"
  private fetchTrainerPageSubscription: Subscription


  img64: any

  text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.`

  trainerPageFormGroup: FormGroup = new FormGroup({
    titleHeading: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    leitmotif: new FormControl('', Validators.required),
    bioTitle: new FormControl('', Validators.required),
    bioSubtitle: new FormControl('', Validators.required),
    bioText: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.trainerPageFormGroup.disable()
    this.cataloguTemplateArray$ = this.fireDatabaseService.fetchAvailableTrainerProduct()
    // this.trainerPageData$ = this.fireDatabaseService.fetchTrainerPage()
    this.fetchTrainerPageSubscription = this.fireDatabaseService.fetchTrainerPage()
      .subscribe((p) => {
        if (p) {
          this.isPageExist = true
          this.trainerPageFormGroup.patchValue(p)
          this.pageID = p.idField
          this.isCoverImageAllreadySet = true
          if (p.backgroundImageURL) {
            this.url = p.backgroundImageURL
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.fetchTrainerPageSubscription.unsubscribe()

  }

  editPage() {
    this.editButtonText = "Save intro"
    if (!this.isPageEditMode) {
      this.openDialogImagePage()
    }
    if (this.isPageEditMode) {
      if (this.isPageEditMode) {

        if (this.trainerPageFormGroup.invalid || !this.trainerPageFormGroup.dirty) {
          this.openDialogInvalidFields()
        } else {
          this.onSubmittrainerPageFormGroup()
        }

      }

    }
  }



  openDialogImagePage() {
    const dialogRef = this.dialog.open(TrainerPageDialogComponent, {
      data: {
        isEditMode: this.isCoverImageAllreadySet,
        coverImageURL: this.url
      },
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        this.trainerPageFormGroup.enable()
        this.isPageEditMode = !this.isPageEditMode
        if (data) {
          this.url = data.img64
          this.img64 = data.img64
          this.isOldImageToBeDeleted = data.isOldImageToBeDeleted
          this.oldURL = data.oldURL
        }
      }
    )
  }

  async onSubmittrainerPageFormGroup() {
    if (this.img64) {
      const img = base64ToFile(this.img64)
      await this.preparePhotoSession(img, this.isOldImageToBeDeleted).subscribe(p => {
        const data: TrainerPage = {
          backgroundImageURL: p,
          titleHeading: this.trainerPageFormGroup.value.titleHeading,
          title: this.trainerPageFormGroup.value.title,
          leitmotif: this.trainerPageFormGroup.value.leitmotif,
          bioTitle: this.trainerPageFormGroup.value.bioTitle,
          bioSubtitle: this.trainerPageFormGroup.value.bioSubtitle,
          bioText: this.trainerPageFormGroup.value.bioText,
          published: false,
          cratedON: Date()
        }

        if (!this.isPageExist) {
          this.fireDatabaseService.createTrainerPage(data)
        } else {
          this.fireDatabaseService.editTrainerPage(data, this.pageID)
        }
      })
    } else {
      const data: TrainerPage = {
        titleHeading: this.trainerPageFormGroup.value.titleHeading,
        title: this.trainerPageFormGroup.value.title,
        leitmotif: this.trainerPageFormGroup.value.leitmotif,
        bioTitle: this.trainerPageFormGroup.value.bioTitle,
        bioSubtitle: this.trainerPageFormGroup.value.bioSubtitle,
        bioText: this.trainerPageFormGroup.value.bioText,
        published: false,
        cratedON: Date()
      }

      this.fireDatabaseService.editTrainerPage(data, this.pageID)

    }
    this.editButtonText = "edit intro"
    this.isPageEditMode = !this.isPageEditMode
    this.isOldImageToBeDeleted = false
  }

  preparePhotoSession(fileImage, isOldImageToBeDeleted): Observable<any> {

    if (isOldImageToBeDeleted) {

      this.storage.storage.refFromURL(this.oldURL).delete();
    }

    const imgID = uuidv4()
    const fileCroppedImage: File = fileImage
    const filePath = `${this.authService.userID}/trainerCatalogue/${imgID}`
    const task = this.storage.upload(filePath, fileCroppedImage)
    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      )

    return this.downloadURL$
  }


  openDialogInvalidFields() {

    const invalidFields = this.findInvalidControls()
    const dialogRef = this.dialog.open(TrainerInvalidFieldDialogComponent, {
      data: {
        invalidFields: invalidFields
      },
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.isPageEditMode = data.abort
          this.trainerPageFormGroup.disable()
          this.editButtonText = "Edit intro"
        }
      }
    )
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.trainerPageFormGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        switch (true) {
          case name == "titleHeading": invalid.push("Heading title")
            break
          case name == "title": invalid.push("Main title")
            break
          case name == "leitmotif": invalid.push("Leitmotif")
            break
          case name == "bioTitle": invalid.push("Bio title")
            break
          case name == "bioSubtitle": invalid.push("Bio subtitle")
            break
          case name == "bioText": invalid.push("Text for bio")
        }
      }
    }
    console.log(invalid);

    return invalid;
  }

  openDialogCreateTrainerProduct(index: number) {

    const dialogRef = this.dialog.open(TrainerCatalogueDialogComponent, {
      data: {
        index: index,
      },
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(

      (data: TrainerProduct) => {
        if (data) {
          this.fireDatabaseService.createTrainerProduct(data)
        }
      }
    )
  }

  openDialogEditTrainerProduct(id: string, product) {

    const dialogRef = this.dialog.open(TrainerCatalogueDialogComponent, {
      data: {
        product
      },
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed()
      .subscribe(
        (data: TrainerProduct) => {
          if (data) {
            this.fireDatabaseService.editTrainerProduct(data, id)
          }
        }
      )

  }

  deleteTrainerProduct(id: string, product: TrainerProduct) {
    this.storage.storage.refFromURL(product.imgURL).delete();
    this.fireDatabaseService.deleteTrainerProduct(id)
  }

  cataloguTemplate1: TrainerProduct = {
    imgURL: "/assets//accessory/crossfit.jpg",
    titleCard: "Crossfit workout",
    subTitleCard: "Push your limit",
    descripition: "Training description goes here.",
    price: 99.00,
    tags: ["#Crossfit", "#Bodybuilding"],
    cratedON: Date()
  }

}


