import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// @ts-ignore
import {MatDatepickerModule} from '@angular/material/datepicker';
// @ts-ignore
import {MatFormFieldModule} from '@angular/material/form-field';
// @ts-ignore
import {MatNativeDateModule} from '@angular/material/core';
// @ts-ignore
import {MatInputModule} from '@angular/material/input';
// @ts-ignore
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

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
    MatMomentDateModule,
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
    BrowserAnimationsModule,
    MatMomentDateModule
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
