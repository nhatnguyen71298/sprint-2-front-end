import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../authentication/login/login.component';
import {SignUpComponent} from '../authentication/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/page-not-found/page-not-found.component';
import { EmployeeListComponent } from './employee-management/employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-management/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-management/employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './employee-management/employee-view/employee-view.component';
import { EmployeeDeleteComponent } from './employee-management/employee-delete/employee-delete.component';
import { StatisticOverviewComponent } from './statistic/statistic-overview/statistic-overview.component';
import { StatisticTicketComponent } from './statistic/statistic-ticket/statistic-ticket.component';
import { StatisticSalesComponent } from './statistic/statistic-sales/statistic-sales.component';
import { StatisticCarComponent } from './statistic/statistic-car/statistic-car.component';
import { StatisticCustomerComponent } from './statistic/statistic-customer/statistic-customer.component';


export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: 'employee-list', component: EmployeeListComponent},
      // {path: 'sign-up', component: SignUpComponent},
      // {path: 'page-not-found', component: PageNotFoundComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeEditComponent, EmployeeViewComponent, EmployeeDeleteComponent, StatisticOverviewComponent, StatisticTicketComponent, StatisticSalesComponent, StatisticCarComponent, StatisticCustomerComponent]
})
export class AppAdminRoutingModule { }
