import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AppEmployeeRoutingModule } from './app-employee-routing.module';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    AppEmployeeRoutingModule,
    MaterialModule
  ],
  providers: [DatePipe]
})
export class AppEmployeeModule { }
