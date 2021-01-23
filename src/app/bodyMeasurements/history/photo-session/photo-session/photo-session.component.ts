import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { concatMap, last, map } from 'rxjs/operators';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AuthService } from './../../../../auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

interface PhotoSessionToUpload {
  front: { urlFront?: string, viewName: "Front" };
  back: { urlBack?: string, viewName: "Back" };
  side: { urlSide?: string, viewName: "Side" };
  date?: Date | any;
}

@Component({
  selector: 'app-photo-session',
  templateUrl: './photo-session.component.html',
  styleUrls: ['./photo-session.component.css']
})
export class PhotoSessionComponent implements OnInit {

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
    private fireDatabaseService: FireDatabaseService,) { }

  ngOnInit() { }

  frontImageChangedEvent: any = '';
  sideImageChangedEvent: any = '';
  backImageChangedEvent: any = '';
  frontCroppedImage: any = '';
  sideCroppedImage: any = '';
  backCroppedImage: any = '';

  showFrontCropper = false
  showSideCropper = false
  showBackCropper = false

  photoDate: Date

  loadFrontImage(event: any): void {
    this.frontImageChangedEvent = event;
  }

  frontImageCropped(event: ImageCroppedEvent) {
    this.frontCroppedImage = base64ToFile(event.base64);
  }

  frontImageLoaded() {
    this.showFrontCropper = true;
  }

  frontCropperReady() {

  }

  frontLoadImageFailed() {
    // show message
  }

  loadSideImage(event: any): void {
    this.sideImageChangedEvent = event;
  }

  sideImageCropped(event: ImageCroppedEvent) {
    this.sideCroppedImage = base64ToFile(event.base64);
  }

  sideImageLoaded() {
    this.showSideCropper = true;
  }
  sideCropperReady() {
    // cropper ready
  }
  sideLoadImageFailed() {
    // show message
  }

  loadBackImage(event: any): void {
    this.backImageChangedEvent = event;
  }

  backImageCropped(event: ImageCroppedEvent) {
    this.backCroppedImage = base64ToFile(event.base64);
  }

  backImageLoaded() {
    this.showBackCropper = true;
  }
  backCropperReady() {
    // cropper ready
  }
  backLoadImageFailed() {
    // show message
  }

  frontUploadPercentage$: Observable<number>
  sideUploadPercentage$: Observable<number>
  backUploadPercentage$: Observable<number>
  frontDownloadURL$: Observable<string>
  sideDownloadURL$: Observable<string>
  backDownloadURL$: Observable<string>

    preparePhotoSession():  Observable<any>  {
    const date = Date()

    let URLArray = []

      const fileFrontCroppedImage: File = this.frontCroppedImage
      const filePathFront = `${this.authService.userID}/bodyPhotos/${date}/front`
      const taskFront = this.storage.upload(filePathFront, fileFrontCroppedImage)
      this.frontUploadPercentage$ = taskFront.percentageChanges()
      this.frontDownloadURL$ = taskFront.snapshotChanges()
        .pipe(
          last(),
          concatMap(() => this.storage.ref(filePathFront).getDownloadURL())
        )
          URLArray.push(this.frontDownloadURL$)


      const fileBackCroppedImage: File = this.backCroppedImage
      const filePathBack = `${this.authService.userID}/bodyPhotos/${date}/back`
      const taskBack = this.storage.upload(filePathBack, fileBackCroppedImage)
      this.backUploadPercentage$ = taskBack.percentageChanges()
      this.backDownloadURL$ = taskBack.snapshotChanges()
        .pipe(
          last(),
          concatMap(() => this.storage.ref(filePathBack).getDownloadURL())
        )
          URLArray.push(this.backDownloadURL$)


      const fileSideCroppedImage: File = this.sideCroppedImage
      const filePathSide = `${this.authService.userID}/bodyPhotos/${date}/side`
      const taskSide = this.storage.upload(filePathSide, fileSideCroppedImage)
      this.sideUploadPercentage$ = taskSide.percentageChanges()
      this.sideDownloadURL$ = taskSide.snapshotChanges()
        .pipe(
          last(),
          concatMap(() => this.storage.ref(filePathSide).getDownloadURL())
        )
        console.log(this.sideDownloadURL$ );
          console.log(this.sideDownloadURL$ );

            URLArray.push(this.sideDownloadURL$)


const p = forkJoin(URLArray).subscribe(data => {
  console.log(data);

}

)

    const session$ = forkJoin(
      URLArray
    ).pipe(
      map(([frontDownloadURL, backDownloadURL ,sideDownloadURL]) => {
        console.log(URLArray.length);

        this.showFrontCropper ? console.log(frontDownloadURL + " frontDownloadURL") : "/assets//accessory/frontman.jpg"
        this.showBackCropper ? console.log(backDownloadURL + " backDownloadURL") : "/assets//accessory/backman.jpg"
        this.showSideCropper ? console.log(sideDownloadURL + " sideDownloadURL") : "/assets//accessory/sideman.jpg"
        return {
          front: { urlFront: this.showFrontCropper ? frontDownloadURL : "/assets//accessory/frontman.jpg", viewName: "Front" },
          back: { urlBack: this.showBackCropper ? backDownloadURL : "/assets//accessory/backman.jpg", viewName: "Back" },
          side: { urlSide: this.showSideCropper ? sideDownloadURL : "/assets//accessory/sideman.jpg", viewName: "Side" },
          date: Date()
        }
      })
    );

    return session$
  }

  async uploadPhotoSet() {
console.log("piipo");

   ( await this.preparePhotoSession()).subscribe(p =>
   { console.log(p) ,

      this.fireDatabaseService.addPhoto2(p)})
  }
}

