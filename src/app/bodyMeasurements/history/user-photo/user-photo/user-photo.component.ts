import { AuthService } from './../../../../auth/auth.service';
import { Photo } from './../../../../interface-model/photo-user';
import { Router, ActivatedRoute } from '@angular/router';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { concatMap, last } from 'rxjs/operators';
@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent implements OnInit {

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
    private fireDatabaseService: FireDatabaseService,
    private router: Router, private route: ActivatedRoute,
  ) { }

  uploadPercentage$: Observable<number>
  downloadURL$: Observable<string>

  private exchangeSubscription: Subscription
  photos$: Observable<Photo[]>

  ngOnInit() {
    this.photos$ = this.fireDatabaseService.fetchAvailablePhoto(0)
  }
  navigateToPhotoSession() {
    this.router.navigate(['../photoSession'], { relativeTo: this.route })
  }

  fileUpload(event) {
    const file: File = event.target.files[0]

    const filePath = `${this.authService.userID}/bodyPhotos/${file.name}`

    const task = this.storage.upload(filePath, file)

    this.uploadPercentage$ = task.percentageChanges()

    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      )

    const saveUrl$ = this.downloadURL$
      .pipe(
        concatMap(url => (
          this.fireDatabaseService.addPhoto(url, Date(), "")))
      )

    this.downloadURL$.subscribe(console.log)
    saveUrl$.subscribe(console.log)

  }

  ngOnDestroy(): void {
  }
}
