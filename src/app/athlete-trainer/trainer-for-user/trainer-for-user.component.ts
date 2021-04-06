import { AuthService } from '../../auth/auth.service';
import { User } from '../../interface-model/user.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trainer-for-user',
  templateUrl: './trainer-for-user.component.html',
  styleUrls: ['./trainer-for-user.component.css']
})
export class TrainerForUserComponent implements OnInit {

  user$: Observable<User>

  constructor( ) { }

  cataloguTemplateArray

  url = "assets/abs.jpg"

  text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.`

  ngOnInit() {
    this.cataloguTemplateArray = [this.cataloguTemplate1, this.cataloguTemplate2, this.cataloguTemplate3, this.cataloguTemplate4, this.cataloguTemplate5, this.cataloguTemplate6]
  }

  cataloguTemplate1 = {
    imgURL: "/assets//accessory/box1.jpg",
    titleCard: "Crossfit workout",
    subTitleCard: "Push your limit",
    textCard: "Crossfit workout",
    price: "99.00",
    currency: "Euro"
  }
  cataloguTemplate2 = {
    imgURL: "/assets//accessory/box2.jpg",
    titleCard: "Functional training",
    subTitleCard: "Push your limit",
    textCard: "Crossfit workout",
    price: "99.00",
    currency: "Euro"
  }
  cataloguTemplate3 = {
    imgURL: "/assets//accessory/box3.jpg",
    titleCard: "Crossfit workout",
    subTitleCard: "Push your limit",
    textCard: "Crossfit workout",
    price: "99.00",
    currency: "Euro"
  }
  cataloguTemplate4 = {
    imgURL: "/assets//accessory/box4.jpg",
    titleCard: "Body recomposition",
    subTitleCard: "Push your limit",
    textCard: "Crossfit workout",
    price: "99.00",
    currency: "Euro"
  }
  cataloguTemplate5 = {
    imgURL: "/assets//accessory/box5.jpg",
    titleCard: "Body recomposition",
    subTitleCard: "Push your limit",
    textCard: "Crossfit workout",
    price: "99.00",
    currency: "Euro"
  }
  cataloguTemplate6 = {
    imgURL: "/assets//accessory/box6.jpg",
    titleCard: "Nutrition",
    subTitleCard: "Push your limit",
    textCard: "Crossfit workout",
    price: "99.00",
    currency: "Euro"
  }


}
