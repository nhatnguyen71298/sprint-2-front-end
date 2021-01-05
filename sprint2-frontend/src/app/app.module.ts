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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AuthenticationModule,
        AppCustomerModule,
        AppEmployeeModule,
        AppAdminModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
