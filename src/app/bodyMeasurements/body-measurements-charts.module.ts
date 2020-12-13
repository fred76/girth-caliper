import { BtnSidenavAnimatedComponent } from './../shared-ui-elemnts/btn-sidenav-animated/btn-sidenav-animated.component';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { LoadMoreSkinfoldComponent } from './charts/skinfolds-chart/loadMoreSkinfold';
import { BodyChartComponent } from './charts/body-chart/body-chart.component';
import { GirthsChartComponent } from './charts/girths-chart/girths-chart.component';
import { SkinfoldsChartComponent } from './charts/skinfolds-chart/skinfolds-chart.component';
import { ChartContainerComponent } from './charts/chart-container.component';
import { SkinfoldsChartsCardComponent } from './skinfold/SkinfoldsChartsCard';
import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
@NgModule({
  declarations: [
    BtnSidenavAnimatedComponent,
    SkinfoldsChartsCardComponent,
    ChartContainerComponent,
    SkinfoldsChartComponent,
    GirthsChartComponent,
    BodyChartComponent,
    LoadMoreSkinfoldComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ChartsModule
  ],
  exports: []
})
export class BodyMeasurementsChartsModule { }
