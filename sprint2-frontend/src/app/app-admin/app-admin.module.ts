import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAdminRoutingModule} from './app-admin-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../material.module";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from '@angular/common/http';
import {StatisticNotifyComponent} from './statistic/statistic-notify/statistic-notify.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';


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
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
})
export class AppAdminModule { }
