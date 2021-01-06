import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppEmployeeRoutingModule } from './app-employee-routing.module';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    AppEmployeeRoutingModule,
    MaterialModule
  ]
})
export class AppEmployeeModule { }
