import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEmployeeRoutingModule } from './app-employee-routing.module';
import { CameraManagementComponent } from './camera/camera-management/camera-management.component';
import { MessageFromCameraComponent } from './camera/message-from-camera/message-from-camera.component';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [CameraManagementComponent, MessageFromCameraComponent],
  imports: [
    CommonModule,
    AppEmployeeRoutingModule,
    MaterialModule
  ]
})
export class AppEmployeeModule { }
