import { TrainingCreationComponent } from './trainer/training-creation/training-creation.component';
import { AthletesOverviewComponent } from './trainer/athletes-overview/athletes-overview.component';
import { TrainerBioComponent } from './trainer/trainer-bio/trainer-bio.component';
import { TrainerContainerComponent } from './trainer/trainerContainer.component';
import { TrainerForUserComponent } from './trainer-for-user/trainer-for-user.component';
import { UserPhotoComponent } from './history/user-photo/user-photo/user-photo.component';
import { PhotoSessionComponent } from './history/photo-session/photo-session/photo-session.component';
import { BodyChartComponent } from './charts/body-chart/body-chart.component';
import { SkinfoldsChartComponent } from './charts/skinfolds-chart/skinfolds-chart.component';
import { GirthsChartComponent } from './charts/girths-chart/girths-chart.component';
import { ChartContainerComponent } from './charts/chart-container.component';
import { HistoryComponent } from './history/history.component';
import { GirthsComponent } from './girths/girths.component';
import { SkinfoldComponent } from './skinfold/skinfold.component';
import { AuthGuard } from '../auth/auth.guard';
import { BodyMeasurementsComponent } from './body-measurements.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AthleteDetailComponent } from './trainer/athlete-detail/athlete-detail.component';

const routes: Routes = [
  {
    path: 'Body&Measurements', component: BodyMeasurementsComponent, canActivate: [AuthGuard]
    , children: [
      { path: 'skinfoldTab', component: SkinfoldComponent, canActivate: [AuthGuard] },
      { path: 'girthTab', component: GirthsComponent, canActivate: [AuthGuard] },
      { path: 'trainerForUser', component: TrainerForUserComponent, canActivate: [AuthGuard] },

      {
        path: 'trainer', component: TrainerContainerComponent, children: [
          { path: 'trainerBio', component: TrainerBioComponent },
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
