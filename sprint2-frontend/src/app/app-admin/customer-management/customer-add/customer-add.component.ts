import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {NganService} from '../../../service/ngan-service.service';
import {MatDatepicker} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  public formAddNew: FormGroup;
  public carTypeList: any;
  public memberTypeList: any;
  private customerList: any;
  private dateCreate = new Date();
  startAge = new Date(2003, 0, 1);
  // @ts-ignore
  // endDate = this.startDate.getDate() + 7;

  public startDateMin = new Date ();
  public startDateTS = new Date('yyyy/MM/dd');
  private pipe: DatePipe;

  constructor(public formBuilder: FormBuilder,
              public nganService: NganService,
              public router: Router) { }
  ngOnInit() {
    this.formAddNew = this.formBuilder.group({
      car_id: [''],
      customerCode: ['', [Validators.required, Validators.pattern('^KH-\\d{4}$')]],
      identityNumber: ['', [Validators.required, Validators.pattern('^\\d{9}|\\d{12}$')]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +\n' +
        '            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +\n' +
        '            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'), Validators.minLength(3),
        Validators.maxLength(45), this.nganService.validateWhitespace]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z][\\w]{3,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^0\\d{9}|(\\+84)\\d{9}$')]],
      address: ['', [Validators.required, Validators.pattern('^\\d{1,3}\\D{5,45}$')]],
      brandName: ['', [Validators.required, Validators.pattern('^[\\D]*$'), Validators.minLength(3),
        Validators.maxLength(45)]],
      plateNumber: ['', [Validators.required, Validators.pattern('^\\d{2}[A-Z]-\\d{4,5}$')]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      carType: ['', [Validators.required]],
      memberCardType: ['', [Validators.required]],
    });
    this.nganService.findAllCarType().subscribe(data => {
      this.carTypeList = data;
      // console.log(this.carTypeList);
    });
    this.nganService.findAllMemberType().subscribe(data => {
      this.memberTypeList = data;
      console.log(this.memberTypeList);
    });
  }
  addNewCustomer() {
    console.log(this.formAddNew.value);
    // this.formAddNew.controls.appAccount.setValue(
    //   {
    //     username: 'Kh-12',
    //     password: '123',
    //     verificationCode: '',
    //     appRole: 3,
    //   }
    // );
    this.pipe = new DatePipe('en-US');
    this.nganService.addNewCustomer(this.formAddNew.value).subscribe(data => {
      this.router.navigateByUrl('admin/customer-list');
    });
  }
  comeBack() {
    this.router.navigateByUrl('admin/customer-list');
  }

  changeStartDate(startDate: MatDatepicker<any>) {
    this.startDateTS = startDate._datepickerInput.value;
    this.startDateTS.setDate(this.startDateTS.getDate() + 7);
  }
}
