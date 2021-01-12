import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAdminRoutingModule} from './app-admin-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../material.module";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from '@angular/common/http';
import {StatisticNotifyComponent} from './statistic/statistic-notify/statistic-notify.component';


@NgModule({
  declarations: [StatisticNotifyComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppAdminRoutingModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ]

})
export class AppAdminModule {
}
