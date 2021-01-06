import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminRoutingModule } from './app-admin-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../material.module";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    AppAdminRoutingModule,
    CommonModule,
    MatDialogModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    } )
  ]

})
export class AppAdminModule { }
