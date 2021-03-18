import { last, concatMap } from 'rxjs/operators';
import { FireDatabaseService } from './../../Services/fire-database.service';
import { AuthService } from './../../auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {

  constructor(private storage: AngularFireStorage,
    private authService: AuthService,
    private fireDatabaseService: FireDatabaseService) { }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  showCropper = false
  uploadPercentage$: Observable<number>
  downloadURL$: Observable<string>


  @Output() imgURL = new EventEmitter<string>();

  @Input() index: number

  ngOnInit() {
console.log("index", this.index);


  }
  loadFrontImage(event: any): void {
    this.imageChangedEvent = event;
  }

  frontImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = base64ToFile(event.base64);


  }

  frontImageLoaded() {
    this.showCropper = true;
  }

  frontCropperReady() {

  }

  frontLoadImageFailed() {
    // show message
  }


  preparePhotoSession(index: number): Observable<any> {
    const date = Date()


    const fileCroppedImage: File = this.croppedImage
    const filePath = `${this.authService.userID}/trainerCatalogue/${index}`
    const task = this.storage.upload(filePath, fileCroppedImage)
    this.uploadPercentage$ = task.percentageChanges()
    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      )

   return this.downloadURL$
  }



  async uploadPhoto(index:number) {

    (await this.preparePhotoSession(index)).subscribe(p => {
      this.imgURL.emit(p)
    })

  }

}
