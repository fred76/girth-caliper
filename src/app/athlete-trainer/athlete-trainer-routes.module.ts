import { SkinfoldComponent } from './athlete/skinfold/skinfold.component';
import { GirthsComponent } from './athlete/girths/girths.component';
import { HistoryComponent } from './athlete/history/history.component';
import { PhotoSessionComponent } from './athlete/history/photo-session/photo-session/photo-session.component';
import { UserPhotoComponent } from './athlete/history/user-photo/user-photo/user-photo.component';
import { TrainerCatalogueTempalteComponent } from './trainer/trainer-catalogue-tempalte/trainer-catalogue-tempalte/trainer-catalogue-tempalte.component';
import { TrainingCreationComponent } from './trainer/training-creation/training-creation.component';
import { AthletesOverviewComponent } from './trainer/athletes-overview/athletes-overview.component';
import { TrainerBioComponent } from './trainer/trainer-bio/trainer-bio.component';
import { TrainerContainerComponent } from './trainer/trainerContainer.component';
import { TrainerForUserComponent } from './trainer-for-user/trainer-for-user.component';
import { BodyChartComponent } from './athlete/charts/body-chart/body-chart.component';
import { SkinfoldsChartComponent } from './athlete/charts/skinfolds-chart/skinfolds-chart.component';
import { GirthsChartComponent } from './athlete/charts/girths-chart/girths-chart.component';
import { ChartContainerComponent } from './athlete/charts/chart-container.component';
import { AuthGuard } from '../auth/auth.guard';
import { AthleteTrainerComponent } from './athlete-trainer.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AthleteDetailComponent } from './trainer/athlete-detail/athlete-detail.component';

const routes: Routes = [
  {
    path: 'Body&Measurements', component: AthleteTrainerComponent, canActivate: [AuthGuard]
    , children: [
      { path: 'skinfoldTab', component: SkinfoldComponent, canActivate: [AuthGuard] },
      { path: 'girthTab', component: GirthsComponent, canActivate: [AuthGuard] },
      { path: 'trainerForUser', component: TrainerForUserComponent, canActivate: [AuthGuard] },

      {
        path: 'trainer', component: TrainerContainerComponent, children: [
          { path: 'trainerBio', component: TrainerBioComponent },
          { path: 'trainerPage', component: TrainerCatalogueTempalteComponent },
          { path: 'athleteList', component: AthletesOverviewComponent },
          { path: 'athleteDetails', component: AthleteDetailComponent },
          { path: 'trainingCreation', component: TrainingCreationComponent },
        ]
      },
      {
        path: 'photoTab', component: HistoryComponent, canActivate: [AuthGuard], children:
          [
            { path: 'userPhoto', component: UserPhotoComponent },
            { path: 'photoSession', component: PhotoSessionComponent },
          ],
      },
      {
        path: 'insightTab', component: ChartContainerComponent, children: [
          { path: '', component: GirthsChartComponent },
          { path: 'ghirthsChart', component: GirthsChartComponent },
          { path: 'skinfoldsChart', component: SkinfoldsChartComponent },
          { path: 'bodyChart', component: BodyChartComponent }
        ]
      },



    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class BodyMeasurementRoutesModule { }
