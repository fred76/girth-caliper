import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts'

import { NgxMatStepLazyLoadModule } from 'ngx-mat-step-lazy-load';

import { Utility } from './Utility/utility';

import { HeaderComponent } from './navigation/header/header.component';

import { BodyMeasurementsComponent } from './bodyMeasurements/body-measurements.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupUserComponent } from './auth/signup-user/signup-user.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';

import { GirthsComponent } from './bodyMeasurements/girths/girths.component';
import { ConfirmGirthsComponent } from './bodyMeasurements/girths/confirmGirths';

import { SkinfoldComponent } from './bodyMeasurements/skinfold/skinfold.component';
import { SkinfoldsChartsCardComponent } from './bodyMeasurements/skinfold/SkinfoldsChartsCard';
import { ConfirmSkinfoldComponent } from './bodyMeasurements/skinfold/confirmSkinfolds';

import { HistoryComponent } from './bodyMeasurements/history/history.component';

import { BtnSidenavAnimatedComponent } from './shared-ui-elemnts/btn-sidenav-animated/btn-sidenav-animated.component';
import { SkinfoldsChartComponent } from './bodyMeasurements/charts/skinfolds-chart/skinfolds-chart.component';


import { ChartContainerComponent } from './bodyMeasurements/charts/chart-container.component';
import { GirthsChartComponent } from './bodyMeasurements/charts/girths-chart/girths-chart.component';
import { BodyChartComponent } from './bodyMeasurements/charts/body-chart/body-chart.component';
import { LoadMoreSkinfoldComponent } from './bodyMeasurements/charts/skinfolds-chart/loadMoreSkinfold';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyMeasurementsComponent,
    WelcomeComponent,
    SignupUserComponent,
    LoginUserComponent,
    GirthsComponent,
    ConfirmGirthsComponent,
    SkinfoldComponent,
    SkinfoldsChartsCardComponent,
    ConfirmSkinfoldComponent,
    HistoryComponent,
    BtnSidenavAnimatedComponent,
    ChartContainerComponent,
    SkinfoldsChartComponent,
    GirthsChartComponent,
    BodyChartComponent,
    LoadMoreSkinfoldComponent

  ],

  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    NgxMatStepLazyLoadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],

  providers: [Utility],
  bootstrap: [AppComponent]
})
export class AppModule { }
