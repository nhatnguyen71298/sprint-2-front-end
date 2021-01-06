// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
// @ts-ignore
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from './authentication/authentication.module';
import {AppCustomerModule} from './app-customer/app-customer.module';
import {AppEmployeeModule} from './app-employee/app-employee.module';
import {AppAdminModule} from './app-admin/app-admin.module';
import {MaterialModule} from './material.module';
// @ts-ignore
import {ReactiveFormsModule} from '@angular/forms';
// @ts-ignore
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from "./authentication/authentication-routing.module";

// @ts-ignore
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
    MaterialModule,
    AuthenticationRoutingModule
  ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
