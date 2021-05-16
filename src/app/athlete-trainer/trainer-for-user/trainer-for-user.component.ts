import { FireDatabaseService } from './../../Services/fire-database.service';
import { TrainerProduct, TrainerPage } from './../../interface-model/trainer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trainer-for-user',
  templateUrl: './trainer-for-user.component.html',
  styleUrls: ['./trainer-for-user.component.css']
})
export class TrainerForUserComponent implements OnInit {


  constructor(
    private fireDatabaseService: FireDatabaseService,) { }

  cataloguTemplateArray$: Observable<TrainerProduct[]>
  trainerPageData$: Observable<TrainerPage>

  url = "assets/abs.jpg"

  text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.`

  ngOnInit() {
    this.cataloguTemplateArray$ = this.fireDatabaseService.fetchAvailableTrainerProductFromAthlete("QHtNJo5TfJawjn1kGIz5p0LNS1j2")
    this.trainerPageData$ = this.fireDatabaseService.fetchTrainerPageFromAthlete("QHtNJo5TfJawjn1kGIz5p0LNS1j2")





  }
}
