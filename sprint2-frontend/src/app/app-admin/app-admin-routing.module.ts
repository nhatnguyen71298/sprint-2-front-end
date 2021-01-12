import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../authentication/login/login.component';
import {SignUpComponent} from '../authentication/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/page-not-found/page-not-found.component';
import {EmployeeListComponent} from './employee-management/employee-list/employee-list.component';
import {EmployeeAddComponent} from './employee-management/employee-add/employee-add.component';
import {EmployeeEditComponent} from './employee-management/employee-edit/employee-edit.component';
import {EmployeeViewComponent} from './employee-management/employee-view/employee-view.component';
import {EmployeeDeleteComponent} from './employee-management/employee-delete/employee-delete.component';
import {StatisticOverviewComponent} from './statistic/statistic-overview/statistic-overview.component';
import {StatisticTicketComponent} from './statistic/statistic-ticket/statistic-ticket.component';
import {StatisticSalesComponent} from './statistic/statistic-sales/statistic-sales.component';
import {StatisticCarComponent} from './statistic/statistic-car/statistic-car.component';
import {StatisticCustomerComponent} from './statistic/statistic-customer/statistic-customer.component';
import {ListParkingSlotComponent} from './parking-slot/list-parking-slot/list-parking-slot.component';
import {CustomerEditComponent} from './customer-management/customer-edit/customer-edit.component';
import {CustomerViewComponent} from './customer-management/customer-view/customer-view.component';
import {CustomerDeleteComponent} from './customer-management/customer-delete/customer-delete.component';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomerListComponent} from './customer-management/customer-list/customer-list.component';
import {MatDialogModule} from '@angular/material';
import {MessageCustomerComponent} from './customer-management/message-customer/message-customer.component';


export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: 'employee-list', component: EmployeeListComponent},
      // {path: 'sign-up', component: SignUpComponent},
      // {path: 'page-not-found', component: PageNotFoundComponent},
      {path: 'customer-edit', component: CustomerEditComponent},
      {path: 'customer-view', component: CustomerViewComponent},
      {path: 'customer-delete', component: CustomerDeleteComponent},
      {path: 'customer-list', component: CustomerListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatDialogModule, ReactiveFormsModule, MaterialModule],
  exports: [RouterModule],
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeEditComponent,
    EmployeeViewComponent, EmployeeDeleteComponent, StatisticOverviewComponent,
    StatisticTicketComponent, StatisticSalesComponent, StatisticCarComponent, StatisticCustomerComponent,
    ListParkingSlotComponent, CustomerEditComponent, CustomerViewComponent, CustomerDeleteComponent,
    CustomerListComponent, MessageCustomerComponent
  ]
})
export class AppAdminRoutingModule {
}
