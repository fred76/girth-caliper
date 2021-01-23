import { Photo, PhotoSession } from './../../../../interface-model/photo-user';
import { Router, ActivatedRoute } from '@angular/router';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent implements OnInit {

  constructor(
    private fireDatabaseService: FireDatabaseService,
    private router: Router, private route: ActivatedRoute,
  ) { }

  photos$: Observable<PhotoSession[]>

  ngOnInit() {
    this.photos$ = this.fireDatabaseService.fetchAvailablePhoto(0)
  }
  navigateToPhotoSession() {
    this.router.navigate(['../photoSession'], { relativeTo: this.route })
  }



  ngOnDestroy(): void {
  }
}
