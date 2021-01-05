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
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule
  ],
  providers: [ MatDatepickerModule ],
})

export class MaterialModule {}
