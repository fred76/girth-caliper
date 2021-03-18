import { ChartFeederService } from './chart-feeder.service';
import { BtnSidenavAnimatedComponent } from './sideBar/btn-sidenav-animated.component';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { BodyChartComponent } from './body-chart/body-chart.component';
import { GirthsChartComponent } from './girths-chart/girths-chart.component';
import { SkinfoldsChartComponent } from './skinfolds-chart/skinfolds-chart.component';
import { ChartContainerComponent } from './chart-container.component';
import { SkinfoldsChartsCardComponent } from '../skinfold/SkinfoldsChartsCard';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../Shared/shared.module';
@NgModule({
  declarations: [
    BtnSidenavAnimatedComponent,
    SkinfoldsChartsCardComponent,
    ChartContainerComponent,
    SkinfoldsChartComponent,
    GirthsChartComponent,
    BodyChartComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ChartsModule,
  ],
  exports: [],
  providers: [ChartFeederService]
})
export class BodyMeasurementsChartsModule { }
