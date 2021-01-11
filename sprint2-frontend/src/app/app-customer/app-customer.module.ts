import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppCustomerRoutingModule} from './app-customer-routing.module';
import {InfoOfCustomerComponent} from './info-of-customer/info-of-customer.component';
import {ListEntryLogComponent} from './list-entry-log/list-entry-log.component';
import {UpdateCustomerComponent} from './update-customer/update-customer.component';
import {SuccessComponent} from './alert/success/success.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {environment} from '../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FocusInvalidInputDirective } from './focus-invalid-input.directive';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

@NgModule({
  declarations: [InfoOfCustomerComponent, ListEntryLogComponent, UpdateCustomerComponent, SuccessComponent,
    FocusInvalidInputDirective],
  imports: [
    CommonModule,
    AppCustomerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  entryComponents: [SuccessComponent],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'vi-VI'}, {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, MatSnackBar]
})
export class AppCustomerModule {
}
