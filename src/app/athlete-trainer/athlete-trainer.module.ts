import { GirthsComponent } from './athlete/girths/girths.component';
import { ConfirmGirthsComponent } from './athlete/girths/confirmGirths';
import { SkinfoldComponent } from './athlete/skinfold/skinfold.component';
import { HistoryComponent } from './athlete/history/history.component';
import { SkinfoldsService } from './athlete/skinfolds.service';
import { UserPhotoComponent } from './athlete/history/user-photo/user-photo/user-photo.component';
import { PhotoSessionComponent } from './athlete/history/photo-session/photo-session/photo-session.component';
import { ConfirmSkinfoldComponent } from './athlete/skinfold/confirmSkinfolds';
import { ImageLoaderComponent } from '../ui-utility/image-loader/image-loader.component';
import { TrainerCatalogueTempalteComponent } from './trainer/trainer-catalogue-tempalte/trainer-catalogue-tempalte/trainer-catalogue-tempalte.component';
import { TrainerContainerComponent } from './trainer/trainerContainer.component';
import { TrainerForUserComponent } from './trainer-for-user/trainer-for-user.component';
import { GirthsService } from './athlete/girths.service';
import { BodyMeasurementRoutesModule } from './athlete-trainer-routes.module';
import { SharedModule } from '../Shared/shared.module';
import { NgxMatStepLazyLoadModule } from 'ngx-mat-step-lazy-load';
import { RouterModule } from '@angular/router';
import { AthleteTrainerComponent } from './athlete-trainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BodyMeasurementsChartsModule } from './athlete/charts/body-measurements-charts.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TrainerBioComponent } from './trainer/trainer-bio/trainer-bio.component';
import { trainerCatalogueDialogComponent } from './trainer/trainer-catalogue-tempalte/trainer-catalogue-tempalte/trainer-catalogue-dialog';

@NgModule({
  declarations: [
    AthleteTrainerComponent,
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
    TrainerCatalogueTempalteComponent,
    trainerCatalogueDialogComponent,
    ImageLoaderComponent
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