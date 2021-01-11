import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';
import {EmployeeMessageComponent} from '../employee-message/employee-message.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  formEditUser: FormGroup;
  public dataId;
  public maxDate = new Date();
  public minDate = new Date (1920, 0, 1);
  public idMessage = 2;

  constructor(
    private dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.formEditUser = this.formBuilder.group({
      fullName: ['',
        [Validators.required, this.employeeService.validateWhiteSpace,
          this.employeeService.validateSpecialCharacter, Validators.maxLength(45), Validators.minLength(10)
        ]],
      birthday: ['', [Validators.required, this.employeeService.checkAge]],
      gender: [true, [Validators.required]],
      email: ['', [Validators.required, Validators.email,
        Validators.maxLength(50), Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.maxLength (255), this.employeeService.validateWhiteSpace]],
      position: ['', [Validators.required]],

      phoneNumber: ['', [Validators.required, this.employeeService.validPhoneNumber]],

  });
    this.dataId = this.data.dataC;
    this.employeeService.findEmployeeByIdService(this.dataId).subscribe(getData => {
      console.log(getData);
      this.formEditUser.patchValue(getData);
    });
  }
  editEmployee() {
      this.formEditUser.markAllAsTouched();
      console.log(this.formEditUser.value);
      this.employeeService.editEmployeeService(this.formEditUser.value, this.dataId, ).subscribe(data => {
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
