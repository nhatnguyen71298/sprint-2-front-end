import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Employee} from '../model/employee';
import {EmployeeMessageComponent} from '../employee-message/employee-message.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  public formCreateNew: FormGroup;
  public pipe: DatePipe;
  public employee: Employee;
  public listRole: [];
  public maxDate = new Date(2003, 0, 12);
  public minDate = new Date (1960, 0, 1);
  public idMessage = 1;

  constructor(
    private employeeService: EmployeeService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.pipe = new DatePipe('en-US');
    this.employeeService.getAllRole().subscribe(dataType => {
      this.listRole = dataType;
    });
    this.formCreateNew = this.formBuilder.group({
      fullName: ['',
        [Validators.required, this.employeeService.validateWhiteSpace,
          this.employeeService.validateSpecialCharacter, Validators.maxLength(45), Validators.minLength(5)
        ]],
      birthday: ['', [Validators.required, this.employeeService.checkAge]],
      gender: [true, [Validators.required]],
      email: ['', [Validators.required, Validators.email,
        Validators.maxLength(50), Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.maxLength (255), this.employeeService.validateWhiteSpace]],
      position: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/)]],
      phoneNumber: ['', [Validators.required, this.employeeService.validPhoneNumber]],
    });
  }
  createEmployee(): void {
    if (this.formCreateNew.invalid) {
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formCreateNew.markAllAsTouched();
    if (this.formCreateNew.valid) {
      this.employeeService.createNewEmployeeService(this.formCreateNew.value).subscribe(data1 => {
        console.log(data1);
        if (data1 == null) {
          this.dialogRef.close();
          this.openDialogMessage();
        }
      }, error => {
        console.log(error);
      });
    }
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
