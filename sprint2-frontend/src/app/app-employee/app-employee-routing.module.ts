import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../authentication/component/login/login.component';
import {SignUpComponent} from '../authentication/component/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../authentication/component/page-not-found/page-not-found.component';
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
import {CameraManagementComponent} from './camera/camera-management/camera-management.component';
import {AppEmployeeModule} from './app-employee.module';
import {MessageFromCameraComponent} from './camera/message-from-camera/message-from-camera.component';
import {CommonModule} from '@angular/common';
import {DeleteMemberCardDialogComponent} from './member-card/delete-member-card-dialog/delete-member-card-dialog.component';
import {UpdateMemberCardDialogComponent} from './member-card/update-member-card-dialog/update-member-card-dialog.component';
import {MemberCardListComponent} from './member-card/member-card-list/member-card-list.component';
import {MemberCardCreateComponent} from './member-card/member-card-create/member-card-create.component';
import {NgxPaginationModule} from 'ngx-pagination';
// @ts-ignore
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ts-ignore
import {MatInputModule} from '@angular/material/input';
// @ts-ignore
import {MatSelectModule} from '@angular/material/select';
import {SlotInfoComponent} from './entry-management/slot-info/slot-info.component';
import { OpenParkingMapComponent } from './entry-management/open-parking-map/open-parking-map.component';


export const routes: Routes = [
  {
    path: 'employee',
    children: [
      // {path: 'registered-car', component: RegisteredCarComponent},
      {path: 'entry-view', component: EntryViewComponent},
      {path: 'parking-map', component: ParkingMapComponent},
      {path: 'camera', component: CameraManagementComponent},
      {path: 'member-card-list', component: MemberCardListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    NgxPaginationModule, MatDatepickerModule, FormsModule],
  exports: [RouterModule],
  declarations: [CustomerListComponent, CustomerAddComponent, CustomerEditComponent,
    CustomerViewComponent, CustomerDeleteComponent, SlotInfoComponent,
    EntryViewComponent, ParkingMapComponent, RegisteredCarListComponent,
    RegisteredCarAddComponent, RegisteredCarEditComponent, RegisteredCarViewComponent,
    RegisteredCarDeleteComponent, SalesListComponent, SalesAddComponent, SalesEditComponent,
    SalesViewComponent, SalesDeleteComponent, CameraManagementComponent , MessageFromCameraComponent,
    MemberCardListComponent, MemberCardCreateComponent, DeleteMemberCardDialogComponent,
    UpdateMemberCardDialogComponent,
    OpenParkingMapComponent,
  ],
  entryComponents: [DeleteMemberCardDialogComponent]
})
export class AppEmployeeRoutingModule { }
