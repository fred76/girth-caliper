import { UserImageLoaderComponent } from './user-dashboard/user-image-loader/user-image-loader.component';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { SharedModule } from './../Shared/shared.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import { SignupUserComponent } from './signup-user/signup-user.component';
import { NgModule } from '@angular/core';
import { LoginUserComponent } from './login-user/login-user.component';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
@NgModule({
  declarations: [
    SignupUserComponent,
    LoginUserComponent,
    UserDashboardComponent,
    LoginRedirectComponent,
    StripeCheckoutComponent,
    UserImageLoaderComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule],
  exports: []
})
export class AuthModule { }
