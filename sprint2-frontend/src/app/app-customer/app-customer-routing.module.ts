import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../authentication/component/login/login.component';
import {SignUpComponent} from '../authentication/component/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/component/page-not-found/page-not-found.component';
import {PayComponent} from './customer-pay/pay/pay.component';
import {SuccessfullyPayComponent} from './customer-pay/successfully-pay/successfully-pay.component';
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {ChangePasswordUserComponent} from './change-password-user/change-password-user/change-password-user.component';
import {ChangePasswordSuccessfullyComponent} from './change-password-user/change-password-successfully/change-password-successfully.component';
import {ConfirmEmailComponent} from './change-password-user/confirm-email/confirm-email.component';
import {CarListComponent} from './car-list-user/car-list/car-list.component';
import {HistoryPaymentComponent} from './history-payment/history-payment/history-payment.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {ListEntryLogComponent} from "./list-entry-log/list-entry-log.component";
import {InfoOfCustomerComponent} from "./info-of-customer/info-of-customer.component";
import { PayMomoComponent } from './customer-pay/pay-momo/pay-momo.component';


export const routes: Routes = [
  {
    path: 'customer',
    children: [
      {path: 'info', component: InfoOfCustomerComponent},
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'page-not-found', component: PageNotFoundComponent},
      {path: 'pay/:idCustomer', component: PayComponent},
      {path: 'changePassword', component: ChangePasswordUserComponent},
      {path: 'carList', component: CarListComponent},
      {path: 'historyPayment', component: HistoryPaymentComponent},
      {path: 'update', component: UpdateCustomerComponent},
      {path: 'list-entry-log', component: ListEntryLogComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatDialogModule, ReactiveFormsModule, NgxPaginationModule],
  exports: [RouterModule],
  declarations: [PayComponent, SuccessfullyPayComponent, ChangePasswordUserComponent,
    ChangePasswordSuccessfullyComponent, ConfirmEmailComponent, CarListComponent,
    HistoryPaymentComponent, PayMomoComponent],
  entryComponents: [SuccessfullyPayComponent, PayMomoComponent]
})
export class AppCustomerRoutingModule {
}
