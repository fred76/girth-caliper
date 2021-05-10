import { last, concatMap } from 'rxjs/operators';
import { AuthService } from './../../auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {

  constructor(private storage: AngularFireStorage,
    private authService: AuthService) { }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  showCropper = false
  uploadPercentage$: Observable<number>
  downloadURL$: Observable<string>




  @Output() imgURL = new EventEmitter<string>();

  @Output() imgSelected = new EventEmitter<boolean>();

  @Output() blobImage = new EventEmitter<any>()

  @Input() isEditMode: boolean

  @Input() imgURLDefault: string

  @Input() imageRatio: number

  @Input() resizeToHeight: number

  ngOnInit() {


  }
  loadFrontImage(event: any): void {
    this.imageChangedEvent = event;
  }

  frontImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = base64ToFile(event.base64);
    this.blobImage.emit(event.base64)
  }

  frontImageLoaded() {
    this.showCropper = true;
    console.log("showCropper");
    console.log(this.showCropper);
    console.log("showCropper");

    this.imgSelected.emit(true)
  }

  frontCropperReady() {

  }

  frontLoadImageFailed() {
    // show message
  }


  preparePhotoSession(): Observable<any> {

    if (this.isEditMode) {
      this.storage.storage.refFromURL(this.imgURLDefault).delete();
    }

    const imgID = uuidv4()
    const fileCroppedImage: File = this.croppedImage
    const filePath = `${this.authService.userID}/trainerCatalogue/${imgID}`
    const task = this.storage.upload(filePath, fileCroppedImage)
    this.uploadPercentage$ = task.percentageChanges()
    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      )

    return this.downloadURL$
  }




}
