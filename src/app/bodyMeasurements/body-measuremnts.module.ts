import { SkinfoldsService } from './skinfolds.service';
import { GirthsService } from './girths.service';
import { BodyMeasurementRoutesModule } from './body-measurement-routes.module';
import { SharedModule } from './../Shared/shared.module';
import { NgxMatStepLazyLoadModule } from 'ngx-mat-step-lazy-load';
import { RouterModule } from '@angular/router';
import { ConfirmSkinfoldComponent } from './skinfold/confirmSkinfolds';
import { HistoryComponent } from './history/history.component';
import { SkinfoldComponent } from './skinfold/skinfold.component';
import { ConfirmGirthsComponent } from './girths/confirmGirths';
import { GirthsComponent } from './girths/girths.component';
import { BodyMeasurementsComponent } from './body-measurements.component';
import { NgModule } from '@angular/core';
import { BodyMeasurementsChartsModule } from './charts/body-measurements-charts.module';

@NgModule({
  declarations: [
    BodyMeasurementsComponent,
    GirthsComponent,
    ConfirmGirthsComponent,
    SkinfoldComponent,
    HistoryComponent,
    ConfirmSkinfoldComponent],
  imports: [
    SharedModule,
    RouterModule,
    NgxMatStepLazyLoadModule,
    BodyMeasurementsChartsModule,
    BodyMeasurementRoutesModule
  ],
  exports: [],
  providers: [GirthsService, SkinfoldsService]
})
export class BodyMeasuremntsModule { }
