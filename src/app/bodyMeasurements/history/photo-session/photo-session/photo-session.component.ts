import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-photo-session',
  templateUrl: './photo-session.component.html',
  styleUrls: ['./photo-session.component.css']
})
export class PhotoSessionComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  frontImageChangedEvent: any = '';
  sideImageChangedEvent: any = '';
  backImageChangedEvent: any = '';
  frontCroppedImage: any = '';
  sideCroppedImage: any = '';
  backCroppedImage: any = '';

  loadFrontImage(event: any): void {
    this.frontImageChangedEvent = event;
  }
  loadSideImage(event: any): void {
    this.sideImageChangedEvent = event;
  }
  loadBackImage(event: any): void {
    this.backImageChangedEvent = event;
  }

  frontImageCropped(event: ImageCroppedEvent) {
    this.frontCroppedImage = event.base64;
  }
  sideImageCropped(event: ImageCroppedEvent) {
    this.sideCroppedImage = event.base64;
  }
  backImageCropped(event: ImageCroppedEvent) {
    this.backCroppedImage = event.base64;
  }

  frontImageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  frontCropperReady() {
    // cropper ready
  }
  frontLoadImageFailed() {
    // show message
  }

  sideImageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  sideCropperReady() {
    // cropper ready
  }
  sideLoadImageFailed() {
    // show message
  }

  backImageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  backCropperReady() {
    // cropper ready
  }
  backLoadImageFailed() {
    // show message
  }

}
