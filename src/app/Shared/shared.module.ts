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
  ReactiveFormsModule
]

@NgModule({
  imports: p,
  exports: p
})
export class SharedModule { }
