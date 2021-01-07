import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  formEditUser: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formEditUser = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    position: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    // userName: ['', [Validators.required]],
    // phoneNumber: ['', [Validators.required]],
    // role: ['', [Validators.required]]
  });
  }
}
