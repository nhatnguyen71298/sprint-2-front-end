import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-message',
  templateUrl: './employee-message.component.html',
  styleUrls: ['./employee-message.component.css']
})
export class EmployeeMessageComponent implements OnInit {

  public messageUser;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeeMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.messageUser = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
