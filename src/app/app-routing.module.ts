import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: '', loadChildren: () => import('./athlete-trainer/athlete-trainer.module').then(m => m.BodyMeasuremntsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

  constructor() { }
}
