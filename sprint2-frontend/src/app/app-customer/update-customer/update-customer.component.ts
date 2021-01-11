import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../alert/success/success.component';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {CustomerService} from '../../service/lvq-din/customer.service';


@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customer: FormGroup;
  maxBirthdayOfHuman: Date;
  imgSrc: string;
  selectedImage: any = null;
  imageUrl;
  checkAvatar = true;
  REGEX_STRING = '[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
    'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
    'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]';

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private dialog: MatDialog,
              private storage: AngularFireStorage) {
    this.maxBirthdayOfHuman = new Date(Date.parse(new Date().toString()) - 18 * 1000 * 3600 * 24 * 365);
  }

  ngOnInit(): void {
    this.customer = this.formBuilder.group({
      id: [],
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('^(\\s*' + this.REGEX_STRING + '+\\s*)+$')]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.pattern('^[a-z][a-z0-9_\\.]{4,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^((\\(\\+84\\))|(0))9[0-9]{8}$')]],
      address: ['', [Validators.required]],
      identityNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      imageAvatar: ['']
    });
    this.customerService.getCustomerByAccount(1).subscribe(data => {
      this.customer.patchValue(data);
      if (data.imageAvatar != null) {
        this.imgSrc = data.imageAvatar;
      } else {
        this.imgSrc = 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg';
      }
    });
  }

  update() {
    console.log(this.customer)
    if (this.customer.valid) {
      // tslint:disable-next-line:variable-name
      const string = this.customer.get('fullName').value.toLocaleLowerCase().trim();
      let stringtempt = string[0].toLocaleUpperCase();
      for (let i = 1; i < string.length; i++) {
        if (string[i] === ' ' && string[i - 1] === ' ') {
          continue;
        }
        if (string[i] !== ' ' && string[i - 1] === ' ') {
          stringtempt += string[i].toLocaleUpperCase();
          continue;
        }
        stringtempt += string[i];
      }
      this.customer.controls.fullName.setValue(stringtempt);
      this.customerService.updateCustomer(this.customer.value).subscribe(data => {
        const dialogRef = this.dialog.open(SuccessComponent, {
          width: 'auto',
          data: {check: true},
          disableClose: true
        });
        setTimeout(() => dialogRef.close(this.dialog.open(SuccessComponent, {
          width: 'auto',
          data: {check: false}
        })), 1000);
      });
    }
  }

  choosePhoto(image) {
    const file = image;
    if (file.files[0] && file.files[0].type.match('image*')) {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        this.imgSrc = event.target.result;
        this.checkAvatar = false;
      };
      fileReader.readAsDataURL(file.files[0]);
      this.selectedImage = file.files[0];
    }
  }

  upFireBase(avatar) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: 'auto',
      data: {check: true},
      disableClose: false
    });
    const filePath = `avatar/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageUrl = url;
          this.customer.value.imageAvatar = this.imageUrl;
          this.customerService.updateCustomer(this.customer.value).subscribe(() => dialogRef.close(
            this.dialog.open(SuccessComponent, {
              width: '32%',
              data: {check: false}
            })
          ));
        });
      })
    ).subscribe();
    avatar.value = '';
    this.checkAvatar = true;
  }

  reset(avatar) {
    avatar.value = '';
    if (this.customer.value.imageAvatar != null) {
      this.imgSrc = this.customer.value.imageAvatar;
    } else {
      this.imgSrc = 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg';
    }
    this.checkAvatar = true;
  }
}
