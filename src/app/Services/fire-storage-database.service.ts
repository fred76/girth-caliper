import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireStorageDatabaseService {

  constructor(private afStorage: AngularFireStorage) { }

  upload(event) {
  }

}
