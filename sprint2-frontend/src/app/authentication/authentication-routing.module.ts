import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {HomePageComponent} from './home-page/home-page.component';


export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {path: '', component: HomePageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'page-not-found', component: PageNotFoundComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'home-page', component: HomePageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule],
  exports: [RouterModule, LoginComponent, SignUpComponent],
  declarations: [LoginComponent, SignUpComponent, PageNotFoundComponent, ForgotPasswordComponent, HomePageComponent]
})
export class AuthenticationRoutingModule {
}
