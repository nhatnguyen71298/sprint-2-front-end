import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeService} from '../../../service/employee.service';
import {EmployeeViewComponent} from '../employee-view/employee-view.component';
import {EmployeeDeleteComponent} from '../employee-delete/employee-delete.component';
import {EmployeeAddComponent} from '../employee-add/employee-add.component';
import {EmployeeEditComponent} from '../employee-edit/employee-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  public list;
  public checkList = 'true';
  key: string;
  p: number;
  public valueSearch: string;
  constructor(
    public employeeService: EmployeeService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployeeService().subscribe(data => {
      this.list = data;
    });
  }
  openDialogDelete(id: any): void {
    this.employeeService.findEmployeeByIdService(id).subscribe(varialble => {
      const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
        width: '750px',
        data: {dataNeed: varialble},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }
  resetFind() {
    this.key = '';
    this.checkList = 'true';
    this.ngOnInit();
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '700px',
      maxHeight: '90vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialogEdit(id): void {
    this.employeeService.findEmployeeByIdService(id).subscribe(dataEmployee => {
      const dialogRef = this.dialog.open(EmployeeEditComponent, {
        width: '600px',
        maxHeight: '90vh',
        data: {dataC: dataEmployee.id},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }
  openDialogView(id): void {
    this.employeeService.findEmployeeByIdService(id).subscribe(dataEmployee => {
      const dialogRef = this.dialog.open(EmployeeViewComponent, {
        width: '600px',
        maxHeight: '90vh',
        data: {dataC: dataEmployee},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

  search(): void {
    this.p = 0;
    this.employeeService.searchEmployee(this.valueSearch.trim()).subscribe(dataSearch => {
      this.list = dataSearch;
    });
  }

}
