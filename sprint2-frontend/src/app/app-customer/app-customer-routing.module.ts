import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../authentication/login/login.component';
import {SignUpComponent} from '../authentication/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/page-not-found/page-not-found.component';
import {PayComponent} from './customer-pay/pay/pay.component';
import {SuccessfullyPayComponent} from './customer-pay/successfully-pay/successfully-pay.component';
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";


export const routes: Routes = [
  {
    path: 'customer',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'page-not-found', component: PageNotFoundComponent},
      {path: 'pay', component: PayComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatDialogModule],
  exports: [RouterModule],
  declarations: [PayComponent, SuccessfullyPayComponent],
  entryComponents: [SuccessfullyPayComponent]
})
export class AppCustomerRoutingModule {
}
