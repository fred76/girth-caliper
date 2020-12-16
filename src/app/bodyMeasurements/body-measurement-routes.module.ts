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

const routes: Routes = [
  // { path: 'Body&Measurements', redirectTo: '/Body&Measurements', pathMatch: 'full' },
  {
    path: 'Body&Measurements', component: BodyMeasurementsComponent, canActivate: [AuthGuard], children: [
      { path: 'skinfoldTab', component: SkinfoldComponent, canActivate: [AuthGuard] },
      { path: 'girthTab', component: GirthsComponent, canActivate: [AuthGuard] },
      { path: 'photoTab', component: HistoryComponent, canActivate: [AuthGuard] },
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
  exports: [RouterModule]
})
export class BodyMeasurementRoutesModule { }
