import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './component/forgot-password/forgot-password.component';
import {HomePageComponent} from './component/home-page/home-page.component';
import {MessageComponent} from './component/message/message.component';
import {AppRoutingModule} from '../app-routing.module';
import {ResetPasswordComponent} from './component/reset-password/reset-password.component';
import {MaterialModule} from '../material.module';


export const routes: Routes = [
  // {
  //   path: 'authentication',
  //   children: [
  //     {path: '', component: LoginComponent},
  //     // {path: 'login', component: LoginComponent},
  //     {path: 'sign-up', component: SignUpComponent},
  //     {path: 'page-not-found', component: PageNotFoundComponent},
  //     {path: 'forgot-password', component: ForgotPasswordComponent},
  //     {path: 'home-page', component: HomePageComponent},
  //   ]
  // }
  {path: '', component: LoginComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule, AppRoutingModule, MaterialModule],
  exports: [RouterModule, LoginComponent, SignUpComponent],
  // tslint:disable-next-line:max-line-length
  declarations: [LoginComponent, ResetPasswordComponent, SignUpComponent, PageNotFoundComponent, ForgotPasswordComponent, HomePageComponent, MessageComponent]
})
export class AuthenticationRoutingModule {
}
