import { SignupUserComponent } from './auth/signup-user/signup-user.component';
import { BodyChartComponent } from './bodyMeasurements/charts/body-chart/body-chart.component';
import { SkinfoldsChartComponent } from './bodyMeasurements/charts/skinfolds-chart/skinfolds-chart.component';
import { ChartContainerComponent } from './bodyMeasurements/charts/chart-container.component';
import { HistoryComponent } from './bodyMeasurements/history/history.component';
import { SkinfoldComponent } from './bodyMeasurements/skinfold/skinfold.component';
import { GirthsComponent } from './bodyMeasurements/girths/girths.component';

import { GirthsChartComponent } from './bodyMeasurements/charts/girths-chart/girths-chart.component';
import { BodyMeasurementsComponent } from './bodyMeasurements/body-measurements.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './auth/login-user/login-user.component';

const routes: Routes = [
  { path: 'Login', component: LoginUserComponent },
  { path: 'Signup', component: SignupUserComponent },
  { path: '', redirectTo: '/Body&Measurements', pathMatch: 'full' },
  {
    path: 'Body&Measurements', component: BodyMeasurementsComponent, children: [
      { path: 'skinfoldTab', component: SkinfoldComponent },
      { path: 'girthTab', component: GirthsComponent },
      { path: 'photoTab', component: HistoryComponent },
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
];
/*
girthTab', index : 0},
{label: '', link: './skinfoldTab', index : 0},
{label: 'Photo', link: './photoTab', index : 0},
{label: 'Insight', link: './girthChart
 export const appRouting = RouterModule.forRoot(routes)
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
