import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminRoutingModule } from './app-admin-routing.module';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppAdminRoutingModule,
    MatDialogModule
  ],
  entryComponents: []
})
export class AppAdminModule { }
