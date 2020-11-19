import { BodyChartComponent } from './bodyMeasurements/charts/body-chart/body-chart.component';
import { SkinfoldsChartComponent } from './bodyMeasurements/charts/skinfolds-chart/skinfolds-chart.component';
import { ChartContainerComponent } from './bodyMeasurements/charts/chart-container.component';
import { HistoryComponent } from './bodyMeasurements/history/history.component';
import { CaliperComponent } from './bodyMeasurements/caliper/caliper.component';
import { GirthsComponent } from './bodyMeasurements/girths/girths.component';

import { GirthsChartComponent } from './bodyMeasurements/charts/girths-chart/girths-chart.component';
import { BodyMeasurementsComponent } from './bodyMeasurements/body-measurements.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/Body&Measurements', pathMatch: 'full' },
  {
    path: 'Body&Measurements', component: BodyMeasurementsComponent, children: [
      { path: 'skinfoldTab', component: CaliperComponent },
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
