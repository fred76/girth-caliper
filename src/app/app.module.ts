import { AnimateModule } from './animation-utility/animate.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment.prod';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { Utility } from './Utility/utility';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui'
import { AngularFireStorageModule } from '@angular/fire/storage';


import { HeaderComponent } from './navigation/header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    AuthModule,
    AnimateModule,
    AngularFireStorageModule
    // BodyMeasuremntsModule,
    // BodyMeasurementsChartsModule
  ],

  providers: [
    Utility,


  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
