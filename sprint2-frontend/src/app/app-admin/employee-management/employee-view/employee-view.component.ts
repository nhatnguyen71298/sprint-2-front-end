import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../model/employee';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  public employee = new Employee() ;
  public view;

  constructor(
    private dialogRef: MatDialogRef<EmployeeViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.employee = this.data.dataC;
    this.view = this.employee;
    if (this.view.gender === false) {
      this.view.gender = 'Nữ';
    } else {
      this.view.gender = 'Nam';
    }
  }}
