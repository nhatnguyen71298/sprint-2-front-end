import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../authentication/login/login.component';
import {SignUpComponent} from '../authentication/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/page-not-found/page-not-found.component';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-management/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-management/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './customer-management/customer-view/customer-view.component';
import { CustomerDeleteComponent } from './customer-management/customer-delete/customer-delete.component';
import { EntryViewComponent } from './entry-management/entry-view/entry-view.component';
import { ParkingMapComponent } from './entry-management/parking-map/parking-map.component';
import { RegisteredCarListComponent } from './registered-car-management/registered-car-list/registered-car-list.component';
import { RegisteredCarAddComponent } from './registered-car-management/registered-car-add/registered-car-add.component';
import { RegisteredCarEditComponent } from './registered-car-management/registered-car-edit/registered-car-edit.component';
import { RegisteredCarViewComponent } from './registered-car-management/registered-car-view/registered-car-view.component';
import { RegisteredCarDeleteComponent } from './registered-car-management/registered-car-delete/registered-car-delete.component';
import { SalesListComponent } from './sales-management/sales-list/sales-list.component';
import { SalesAddComponent } from './sales-management/sales-add/sales-add.component';
import { SalesEditComponent } from './sales-management/sales-edit/sales-edit.component';
import { SalesViewComponent } from './sales-management/sales-view/sales-view.component';
import { SalesDeleteComponent } from './sales-management/sales-delete/sales-delete.component';


export const routes: Routes = [
  {
    path: 'employee',
    children: [
      // {path: 'registered-car', component: RegisteredCarComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [CustomerListComponent, CustomerAddComponent, CustomerEditComponent, CustomerViewComponent, CustomerDeleteComponent, EntryViewComponent, ParkingMapComponent, RegisteredCarListComponent, RegisteredCarAddComponent, RegisteredCarEditComponent, RegisteredCarViewComponent, RegisteredCarDeleteComponent, SalesListComponent, SalesAddComponent, SalesEditComponent, SalesViewComponent, SalesDeleteComponent]
})
export class AppEmployeeRoutingModule { }
