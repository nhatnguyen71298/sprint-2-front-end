import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HoangService {
  public API = 'http://localhost:8080/customer';

  constructor(
    public http: HttpClient
  ) {
  }

  getCustomerById(customerId): Observable<any> {
    return this.http.get(this.API + '/findCustomerById/' + customerId);
  }

  prepareDeleteCustomer(customerId): Observable<any> {
    return this.http.get(this.API + '/prepare-delete-customer/' + customerId);
  }

  deleteCustomer(customerId): Observable<any> {
    return this.http.delete(this.API + '/delete-customer/' + customerId);
  }

  editCustomer(customerDTO, customerId): Observable<any> {
    console.log('customerDTO');
    console.log(customerDTO);
    return this.http.put(this.API + '/editCustomer/' + customerId, customerDTO);
  }

  // validate ngày sinh không được lơn hơn ngày hiện tại.
  validateBirthday(control: AbstractControl) {
    const chooseDate = new Date(control.value).getTime();
    const currentDate = new Date().getTime();
    return (chooseDate - currentDate >= 0) ?
      {chooseDateGreaterThanCurrentDate: true} : null;
  }

  // validate ngày sinh phải trên 18 tuổi.
  checkAge: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const birthday = new Date(control.value);
    const timeBirth: number = birthday.getTime();
    const now = new Date().getTime();
    if (((now - timeBirth) / 365.25 / 24 / 60 / 60 / 1000) < 18) {
      return {checkAge: true};
    }
    return null;
  };
  // validate số điện thoại.
  validPhoneNumber: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const phoneRegex = /^0[35789]\d{8}$/;
    const characterRegex = /^[^\d]+$/;
    // tslint:disable-next-line:variable-name
    const _phoneNumber: string = control.value;
    if (_phoneNumber === '') {
      return null;
    }
    if (characterRegex.test(_phoneNumber)) {
      return {phoneAlpha: true};
    }
    if (!phoneRegex.test(_phoneNumber)) {
      return {format: true};
    }
    return null;
  };

  // Kí tự đặt biệt
  validateSpecialCharacter(control: AbstractControl) {
    const specialCharacter = '[~`!' +
      '@#$%^&*()-+=/*?:;.,|]+';
    return (control.value.match(specialCharacter)) ? {
      specialCharacter: true
    } : null;
  }

// validate khoảng trắng
  validateWhitespace(control: AbstractControl) {
    if ((control.value as string).indexOf('  ') >= 0) {
      return {cannotContainSpace: true};
    }
    return null;
  }

}
