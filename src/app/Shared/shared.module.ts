import { ImageLoaderModule } from './../ui-utility/image-loader/ImageLoader.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

let p: any[] = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  ImageCropperModule,
  ImageLoaderModule
]

@NgModule({
  imports: p,
  exports: p
})
export class SharedModule { }
