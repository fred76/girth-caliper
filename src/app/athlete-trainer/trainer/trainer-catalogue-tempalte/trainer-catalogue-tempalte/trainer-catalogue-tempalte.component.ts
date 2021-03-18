import { trainerCatalogueDialogComponent } from './trainer-catalogue-dialog';
import { AuthService } from '../../../../auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-trainer-catalogue-tempalte',
  templateUrl: './trainer-catalogue-tempalte.component.html',
  styleUrls: ['./trainer-catalogue-tempalte.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TrainerCatalogueTempalteComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private dialog: MatDialog) { }

  cataloguTemplateArray


  url = "assets/abs.jpg"

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
    console.log("yyy");



    this.authService.user$.subscribe(p => console.log(p))

    // this.trainerPageFormGroup = this.fb.group({ bioText: "" })
    this.cataloguTemplateArray = [this.cataloguTemplate1, this.cataloguTemplate2, this.cataloguTemplate3, this.cataloguTemplate4, this.cataloguTemplate5, this.cataloguTemplate6]
  }

  onSubmittrainerPageFormGroup(form: FormGroup) {
    console.log("pppppp", form);
  }

  openDialog(index: number) {

    const dialogRef = this.dialog.open(trainerCatalogueDialogComponent, {
      data: {
        index: index+1,
      },
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(

      data => {
        if (data.index == 1) {
        this.cataloguTemplate1.imgURL = data.imgURL,
        this.cataloguTemplate1.titleCard = data.titleCard,
        this.cataloguTemplate1.subTitleCard = data.subTitleCard,
        this.cataloguTemplate1.descripition = data.descripition,
        this.cataloguTemplate1.tags = data.tags,
        this.cataloguTemplate1.price = data.price
        }
        if (data.index == 2) {
        this.cataloguTemplate2.imgURL = data.imgURL,
        this.cataloguTemplate2.titleCard = data.titleCard,
        this.cataloguTemplate2.subTitleCard = data.subTitleCard,
        this.cataloguTemplate2.descripition = data.descripition,
        this.cataloguTemplate2.tags = data.tags,
        this.cataloguTemplate2.price = data.price
        }
        if (data.index == 3) {
        this.cataloguTemplate3.imgURL = data.imgURL,
        this.cataloguTemplate3.titleCard = data.titleCard,
        this.cataloguTemplate3.subTitleCard = data.subTitleCard,
        this.cataloguTemplate3.descripition = data.descripition,
        this.cataloguTemplate3.tags = data.tags,
        this.cataloguTemplate3.price = data.price
        }
        if (data.index == 4) {
        this.cataloguTemplate4.imgURL = data.imgURL,
        this.cataloguTemplate4.titleCard = data.titleCard,
        this.cataloguTemplate4.subTitleCard = data.subTitleCard,
        this.cataloguTemplate4.descripition = data.descripition,
        this.cataloguTemplate4.tags = data.tags,
        this.cataloguTemplate4.price = data.price
        }
        if (data.index == 5) {
        this.cataloguTemplate5.imgURL = data.imgURL,
        this.cataloguTemplate5.titleCard = data.titleCard,
        this.cataloguTemplate5.subTitleCard = data.subTitleCard,
        this.cataloguTemplate5.descripition = data.descripition,
        this.cataloguTemplate5.tags = data.tags,
        this.cataloguTemplate5.price = data.price
        }
        if (data.index == 6) {
        this.cataloguTemplate6.imgURL = data.imgURL,
        this.cataloguTemplate6.titleCard = data.titleCard,
        this.cataloguTemplate6.subTitleCard = data.subTitleCard,
        this.cataloguTemplate6.descripition = data.descripition,
        this.cataloguTemplate6.tags = data.tags,
        this.cataloguTemplate6.price = data.price
        }
      }
    )}



  cataloguTemplate1 = {
    imgURL: "/assets//accessory/crossfit.jpg",
    titleCard: "Crossfit workout",
    subTitleCard: "Push your limit",
    descripition: "Training description goes here.",
    tags: [ "#Crossfit","#Bodybuilding"],
    price: "99.00"
  }
  cataloguTemplate2 = {
    imgURL: "/assets//accessory/box2.jpg",
    titleCard: "Functional training",
    subTitleCard: "improve your performance",
    descripition: "Training description goes here.",
    tags: ["#functionalTraining","#nutrition", "#bodyRecomposiotion",],
    price: "99.00"
  }
  cataloguTemplate3 = {
    imgURL: "/assets//accessory/box3.jpg",
    titleCard: "Yoga",
    subTitleCard: "Relax your mind and body",
    descripition: "Training description goes here.",
    tags: ["#Yoga", "#Pilates", "#stretching"],
    price: "99.00"
  }
  cataloguTemplate4 = {
    imgURL: "/assets//accessory/box4.jpg",
    titleCard: "Body recomposition",
    subTitleCard: "Rebuild your body",
    descripition: "Training description goes here.",
    tags: ["#Body recomposiotion", "#nutrition"],
    price: "99.00"
  }
  cataloguTemplate5 = {
    imgURL: "/assets//accessory/box5.jpg",
    titleCard: "Bodybuilding",
    subTitleCard: "Push your limit",
    descripition: "Training description goes here.",
    tags: ["#Bodybuilding", "#Body recomposiotion", "#nutrition"],
    price: "99.00"
  }
  cataloguTemplate6 = {
    imgURL: "/assets//accessory/box6.jpg",
    titleCard: "HIIT or LISS",
    subTitleCard: "Push your limit",
    descripition: "Training description goes here.",
    tags: ["#HIIT", "#LIIS", "#Running", "#Bycicling"],
    price: "99.00"
  }


}
