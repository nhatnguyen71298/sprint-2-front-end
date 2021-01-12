import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {HoangService} from '../../../service/hoang.service';
import {MessageCustomerComponent} from '../message-customer/message-customer.component';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {
  public customerOfFullName;
  public customerOfId;
  public idMessage = 3;

  constructor(private dialogRef: MatDialogRef<CustomerDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: HoangService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.customerOfFullName = this.data.data1.fullName;
    this.customerOfId = this.data.data1.id;
  }

  deleteCustomer() {
    console.log(this.customerOfId);
    this.customerService.prepareDeleteCustomer(this.customerOfId).subscribe(() => {
    });
    this.customerService.deleteCustomer(this.customerOfId).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this.openDialogMessage();
    });
  }

// Dialog thông báo xoá thông tin khách hàng thành công.
  openDialogMessage() {
    const timeout = 3000;
    const dialogRef = this.dialog.open(MessageCustomerComponent, {
      width: '500px',
      height: '300px',
      data: {dataMessage: this.idMessage},
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }
}
