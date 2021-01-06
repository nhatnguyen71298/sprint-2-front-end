import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-from-camera',
  templateUrl: './message-from-camera.component.html',
  styleUrls: ['./message-from-camera.component.css']
})
export class MessageFromCameraComponent implements OnInit {

  message: string;
  constructor(
    public dialogMessage: MatDialogRef<MessageFromCameraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    switch (this.data.data1.message) {
      case 'Can\'t read':
        this.message = 'Không đọc được biển số !';
        break;
      case 'Not in database':
        this.message = 'Xe ' + this.data.data1.plateNumber + ' chưa có dữ liệu !';
        break;
      case 'Not member':
        this.message = 'Xe ' + this.data.data1.plateNumber + ' chưa đăng kí thành viên !';
        break;
      case 'Database error':
        this.message = 'Cảnh báo: Xe ' + this.data.data1.plateNumber + ' đang có nhiều hơn hai thẻ member còn hạn !';
        break;
      case 'Member not in expiry':
        this.message = 'Cảnh báo: Xe ' + this.data.data1.plateNumber + ' đã hết hạn thẻ member ! \nKhông được cho ra khỏi bãi !';
        break;
      case 'Member ok':
        this.message = 'Xe ' + this.data.data1.plateNumber + ' checking thành công !'
          + '\nThẻ thành viên có thời hạn đến ngày: ';
        break;
    }
  }
  close() {
    this.dialogMessage.close();
  }
}
