import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageLoaderComponent } from './image-loader.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [ImageCropperModule, MaterialModule, CommonModule],
  declarations: [ImageLoaderComponent],
  exports: [ImageLoaderComponent]
})
export class ImageLoaderModule { }
