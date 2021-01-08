import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../authentication/component/login/login.component';
import {SignUpComponent} from '../authentication/component/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/component/page-not-found/page-not-found.component';
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
import { ListParkingSlotComponent } from './parking-slot/list-parking-slot/list-parking-slot.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {CommonModule} from '@angular/common';
import { CreateParkingSlotComponent } from './parking-slot/create-parking-slot/create-parking-slot.component';


export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: 'employee-list', component: EmployeeListComponent},
      // {path: 'sign-up', component: SignUpComponent},
      // {path: 'page-not-found', component: PageNotFoundComponent},
      {path: 'list-parking-slot', component: ListParkingSlotComponent},
      {path: 'create-parking-slot', component: CreateParkingSlotComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, NgxPaginationModule, CommonModule, OrderModule, ReactiveFormsModule],
  exports: [RouterModule],
  // tslint:disable-next-line:max-line-length
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeEditComponent,
    EmployeeViewComponent, EmployeeDeleteComponent, StatisticOverviewComponent,
    StatisticTicketComponent, StatisticSalesComponent, StatisticCarComponent, StatisticCustomerComponent,
    ListParkingSlotComponent,
    CreateParkingSlotComponent
  ]
})
export class AppAdminRoutingModule { }
