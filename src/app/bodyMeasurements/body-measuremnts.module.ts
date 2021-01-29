import { TrainerContainerComponent } from './trainer/trainerContainer.component';
import { TrainerForUserComponent } from './trainer-for-user/trainer-for-user.component';
import { PhotoSessionComponent } from './history/photo-session/photo-session/photo-session.component';
import { UserPhotoComponent } from './history/user-photo/user-photo/user-photo.component';
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
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BodyMeasurementsChartsModule } from './charts/body-measurements-charts.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TrainerBioComponent } from './trainer/trainer-bio/trainer-bio.component';

@NgModule({
  declarations: [
    BodyMeasurementsComponent,
    GirthsComponent,
    ConfirmGirthsComponent,
    SkinfoldComponent,
    HistoryComponent,
    UserPhotoComponent,
    PhotoSessionComponent,
    ConfirmSkinfoldComponent,
    TrainerForUserComponent,
    TrainerContainerComponent,
    TrainerBioComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    NgxMatStepLazyLoadModule,
    BodyMeasurementRoutesModule,
    BodyMeasurementsChartsModule,
    ImageCropperModule,
	],
  exports: [],
  providers: [GirthsService, SkinfoldsService]
})
export class BodyMeasuremntsModule { }
