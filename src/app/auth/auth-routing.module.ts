import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { AuthGuard } from './auth.guard';
import { UserDashboardComponent } from './../auth/user-dashboard/user-dashboard.component';
import { SignupUserComponent } from './../auth/signup-user/signup-user.component';
import { LoginUserComponent } from './../auth/login-user/login-user.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: 'Login', component: LoginUserComponent },
  { path: 'Signup', component: SignupUserComponent },
  { path: 'LoginRedirect', component: LoginRedirectComponent },
  { path: 'UserDashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
