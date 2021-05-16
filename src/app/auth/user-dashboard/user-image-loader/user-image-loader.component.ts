import { ImageLoaderComponent } from './../../../ui-utility/image-loader/image-loader.component';
import { last, concatMap } from 'rxjs/operators';
import { AuthService } from './../../auth.service';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/interface-model/Interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, Type, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-user-image-loader',
  templateUrl: './user-image-loader.component.html',
  styleUrls: ['./user-image-loader.component.css']
})
export class UserImageLoaderComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData,
    private dialogRef: MatDialogRef<UserImageLoaderComponent>,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  @ViewChild(ImageLoaderComponent) imgLoader: ImageLoaderComponent

  imgURLDefaultCoverImage = "/assets//accessory/user_placeholder.png"
  isImgSelected: boolean
  isImgSelected64: any

  downloadURL$: Observable<string>
  imgURLDefault

  imgSelected(imgSelected: boolean) {
    this.isImgSelected = imgSelected
  }

  imgSelected64(imgSelected64: any) {
    this.isImgSelected64 = imgSelected64
  }




  ngOnInit() {

  }


  async save() {
    await this.imgLoader.prepareUserAvatarPhotoSession().subscribe(p => {
      const data: UserPhoto<any> = {
        photoURL: p,
      }
      this.dialogRef.close(data);
    })

  }

  close() {
    this.dialogRef.close();
  }

  preparePhotoSession(fileImage): Observable<any> {
    const imgID = "userPhoto"
    const fileCroppedImage: File = fileImage
    const filePath = `${this.authService.userID}/${imgID}`
    const task = this.storage.upload(filePath, fileCroppedImage)
    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      )
    return this.downloadURL$
  }

}


export type UserPhoto<T> = Omit<UserType<any>, "uid" | "email">;
