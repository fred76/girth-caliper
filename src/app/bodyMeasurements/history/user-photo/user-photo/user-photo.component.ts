import { AngularFireStorage } from '@angular/fire/storage';
import { PhotoSession } from './../../../../interface-model/photo-user';
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
    private storage: AngularFireStorage,
    private router: Router, private route: ActivatedRoute,
  ) { }

  photos$: Observable<PhotoSession[]>

  ngOnInit() {
    this.photos$ = this.fireDatabaseService.fetchAvailablePhoto(0)
  }
  navigateToPhotoSession() {
    this.router.navigate(['../photoSession'], { relativeTo: this.route })
  }

  deletePhotoSet(id: string, session: PhotoSession) {

    if (session.front.urlFront != "/assets//accessory/frontman.jpg") {
      this.storage.storage.refFromURL(session.front.urlFront).delete();
    }
    if (session.back.urlBack != "/assets//accessory/backman.jpg") {
      this.storage.storage.refFromURL(session.back.urlBack).delete();
    }
    if (session.side.urlSide != "/assets//accessory/sideman.jpg") {
      this.storage.storage.refFromURL(session.side.urlSide).delete();
    }
    this.fireDatabaseService.deletePhotoSet(id)
  }

  ngOnDestroy(): void {
  }
}
