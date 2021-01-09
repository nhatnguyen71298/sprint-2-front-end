import {NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {AppEmployeeRoutingModule} from './app-employee-routing.module';
import {MaterialModule} from '../material.module';
import {MatSnackBar} from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    AppEmployeeRoutingModule,
    MaterialModule
  ],
  providers: [DatePipe, MatSnackBar]
})
export class AppEmployeeModule { }
