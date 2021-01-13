import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee.service';
import {EmployeeMessageComponent} from '../employee-message/employee-message.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  public employee;
  public idDelete;
  public idMessage = 3;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    public employeeService: EmployeeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.employee = this.data.dataNeed;
    this.idDelete = this.data.dataNeed.id;
  }

  deleteEmployee() {
    this.employeeService.deleteEmployeeService(this.idDelete).subscribe(data => {
      if (data == null) {
        this.dialogRef.close();
        this.openDialogMessage();
      }
    });
  }
  openDialogMessage() {
    const timeout = 1500;
    const dialogRef = this.dialog.open(EmployeeMessageComponent, {
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
