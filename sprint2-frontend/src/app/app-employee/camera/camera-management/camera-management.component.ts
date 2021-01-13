import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
// @ts-ignore
import {MatDialog} from '@angular/material/dialog';
import {MessageFromCameraComponent} from '../message-from-camera/message-from-camera.component';
import {NhatService} from '../../../service/nhat.service';

@Component({
  selector: 'app-camera-management',
  templateUrl: './camera-management.component.html',
  styleUrls: ['./camera-management.component.css']
})
export class CameraManagementComponent implements OnInit {
  @ViewChild('takeInput', {static: false})
  takeInput: ElementRef;
  url;
  msg = 'Hãy chọn một ảnh !';
  srcImgForm: FormGroup;
  constructor(
    public cameraService: NhatService,
    public formBuilder: FormBuilder,
    public diaLog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.srcImgForm = this.formBuilder.group({
      src: ''
    });
  }

  selectFile(event) {
    // tslint:disable-next-line:triple-equals
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.url = '';
      this.msg = 'Hãy chọn một ảnh!';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.url = '';
      this.msg = 'Chỉ hỗ trợ file ảnh !';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      this.srcImgForm.controls.src.setValue(event.target.files[0].name);
      this.cameraService.postNewImg(this.srcImgForm.value).subscribe(message => {
        const dialogMessage = this.diaLog.open(MessageFromCameraComponent, {
          width: '500px',
          data: {data1: message},
          disableClose: true
        });
        dialogMessage.afterOpened().subscribe(_ => {
          setTimeout(() => {
            dialogMessage.close();
          }, 3600);
        });
        if (message.message !== 'Can\'t read' && message.message !== 'Not member'){
          dialogMessage.afterClosed().subscribe(result => {
            this.url = '';
            this.msg = 'Hãy chọn một ảnh !';
            this.takeInput.nativeElement.value = '';
          });
        } else {
          dialogMessage.afterClosed().subscribe(result => {
          });
        }
      });
    };
  }
}
