import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from './authentication/authentication.module';
import {AppCustomerModule} from './app-customer/app-customer.module';
import {AppEmployeeModule} from './app-employee/app-employee.module';
import {AppAdminModule} from './app-admin/app-admin.module';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AuthenticationModule,
        AppCustomerModule,
        AppEmployeeModule,
        AppAdminModule,
        MaterialModule
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
