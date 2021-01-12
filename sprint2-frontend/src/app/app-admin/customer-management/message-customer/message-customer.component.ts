// @ts-ignore
import {Component, Inject, OnInit} from '@angular/core';
// @ts-ignore
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

// @ts-ignore
@Component({
  selector: 'app-message-user',
  templateUrl: './message-customer.component.html',
  styleUrls: ['./message-customer.component.css']
})
export class MessageCustomerComponent implements OnInit {
  public messageCustomer;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MessageCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.messageCustomer = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
