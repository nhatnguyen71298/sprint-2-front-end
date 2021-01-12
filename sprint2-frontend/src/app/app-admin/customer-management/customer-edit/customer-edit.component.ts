import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {HoangService} from '../../../service/hoang.service';
import {MessageCustomerComponent} from '../message-customer/message-customer.component';
import {Customer} from '../../../model/customer';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  public formEditCustomer: FormGroup;
  maxDay = new Date();
  minDay = new Date(1950, 0, 1);
  public customerOfId;
  public idMessage = 2;

  constructor(
    private dialogRef: MatDialogRef<CustomerEditComponent>,
    private customerService: HoangService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // Validators.pattern('^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
  // 'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọòỏốồổỗộớờởỡợ' +
  // 'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]\\s*)+$')
  ngOnInit() {
    // form thông tin khách hàng.
    this.formEditCustomer = this.formBuilder.group({
      fullName: ['', [Validators.required, this.customerService.validateSpecialCharacter, Validators.minLength(3),
        Validators.maxLength(45), this.customerService.validateWhitespace]],
      birthday: ['', [Validators.required, this.customerService.checkAge]],
      address: ['', [Validators.required, this.customerService.validateSpecialCharacter, this.customerService.validateWhitespace]],
      email: ['', [Validators.required, Validators.pattern('^[a-z][\\w]{3,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      phone: ['', [Validators.required, Validators.pattern('^0\\d{9}|(\\+84)\\d{9}$')]],
      gender: [true, [Validators.required]],
      customerCode: [''],
      identityNumber: ['', [Validators.required, Validators.pattern('^\\d{9}$')]],
    });
    // Lấy dữ liệu đưa vào Dialog.
    this.customerOfId = this.data.data1.id;
    console.log(this.customerOfId);
    this.customerService.getCustomerById(this.customerOfId).subscribe(getData => {
      console.log(getData);
      this.formEditCustomer.patchValue(getData);
    });
  }// Chỉnh sửa thông tin khách hàng .
  editCustomer() {
    this.formEditCustomer.markAllAsTouched();
    console.log(this.formEditCustomer.value);
    if (this.formEditCustomer.valid) {
      this.customerService.editCustomer(this.formEditCustomer.value, this.customerOfId).subscribe(data => {
        if (data == null) {
          this.dialogRef.close();
          this.openDialogMessage();
        }
      });
    }
  }

  // Dialog thông báo chỉnh sửa thông tin khách hàng thành công.
  openDialogMessage() {
    const timeout = 2000;
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

