import { SkinfoldsChartComponent } from './bodyMeasurements/charts/skinfolds-chart/skinfolds-chart.component';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatStepLazyLoadModule } from 'ngx-mat-step-lazy-load';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts'

import { HeaderComponent } from './navigation/header/header.component';

import { BodyMeasurementsComponent } from './bodyMeasurements/body-measurements.component';
import { SignupUserComponent } from './auth/signup-user/signup-user.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GirthsComponent } from './bodyMeasurements/girths/girths.component';
import { CaliperComponent } from './bodyMeasurements/caliper/caliper.component';
import { HistoryComponent } from './bodyMeasurements/history/history.component';

import { ChartContainerComponent } from './bodyMeasurements/charts/chart-container.component';
import { BtnSidenavAnimatedComponent } from './shared-ui-elemnts/btn-sidenav-animated/btn-sidenav-animated.component';

import { GirthsChartComponent } from './bodyMeasurements/charts/girths-chart/girths-chart.component';
import { CaliperChartsCardComponent } from './bodyMeasurements/caliper/CaliperChartsCard';
import { BodyChartComponent } from './bodyMeasurements/charts/body-chart/body-chart.component';

import { ConfirmCaliperComponent } from './bodyMeasurements/caliper/confirmCaliper';
import { ConfirmGirthsComponent } from './bodyMeasurements/girths/confirmGirths';

import { Utility } from './Utility/utility';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SignupUserComponent,
    LoginUserComponent,
    GirthsComponent,
    CaliperComponent,
    HistoryComponent,
    GirthsChartComponent,
    BodyMeasurementsComponent,
    ConfirmGirthsComponent,
    ConfirmCaliperComponent,
    CaliperChartsCardComponent,
    BtnSidenavAnimatedComponent,
    ChartContainerComponent,
    BodyChartComponent,
    SkinfoldsChartComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartsModule,
    NgxMatStepLazyLoadModule
  ],
  providers: [Utility],
  bootstrap: [AppComponent]
})
export class AppModule { }
