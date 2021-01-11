import {NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatButtonModule} from "@angular/material/button";
import {StatisticCarComponent} from "./app-admin/statistic/statistic-car/statistic-car.component";
import {MY_FORMATS,} from "./app-admin/statistic/statistic-customer/statistic-customer.component";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {StatisticNotifyComponent} from "./app-admin/statistic/statistic-notify/statistic-notify.component";

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  entryComponents: [StatisticCarComponent,StatisticNotifyComponent]
})

export class MaterialModule {
}
