import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './component/home-page/home-page.component';
import {MessageComponent} from './component/message/message.component';
import {AppRoutingModule} from '../app-routing.module';
import {ResetPasswordComponent} from './component/reset-password/reset-password.component';
import {MaterialModule} from '../material.module';
import { InfoComponent } from './component/info/info.component';



export const routes: Routes = [
  {
    path: 'home-page' ,
    children: [
      {path: '', component: InfoComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'info', component: InfoComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule, AppRoutingModule, MaterialModule],
  exports: [RouterModule, LoginComponent, SignUpComponent],
  // tslint:disable-next-line:max-line-length
  declarations: [LoginComponent, ResetPasswordComponent, SignUpComponent, PageNotFoundComponent, HomePageComponent, MessageComponent, InfoComponent]
})
export class AuthenticationRoutingModule {
}
