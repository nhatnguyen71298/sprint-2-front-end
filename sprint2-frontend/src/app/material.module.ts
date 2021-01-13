import {NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MY_FORMATS} from './app-admin/statistic/statistic-customer/statistic-customer.component';
import {StatisticCarComponent} from './app-admin/statistic/statistic-car/statistic-car.component';
import {StatisticNotifyComponent} from './app-admin/statistic/statistic-notify/statistic-notify.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    CommonModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    CommonModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  entryComponents: [StatisticCarComponent, StatisticNotifyComponent]
})

export class MaterialModule {
}
