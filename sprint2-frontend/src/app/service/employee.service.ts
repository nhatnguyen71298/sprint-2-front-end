import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';


class Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  birthday: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
  role: string;
}

const URL = 'http://localhost:8080/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public readonly API: string = 'http://localhost:8080/employee';

  constructor(
    public http: HttpClient
  ) {
  }

  // Create by: Đạt
  getAllEmployeeService(): Observable<any> {
    return this.http.get(this.API + '/list');
  }

  getAllRole(): Observable<any> {
    return this.http.get(this.API + '/listRole');
  }

  findEmployeeByIdService(idFind: any): Observable<any> {
    return this.http.get(this.API + '/findEmployeeById/' + idFind);
  }

  createNewEmployeeService(employeeDTO: Employee): Observable<any> {
    return this.http.post(this.API + '/createNew', employeeDTO);
  }

  editEmployeeService(employeeDTO, idNeedEdit): Observable<any> {
    return this.http.put<any>(this.API + '/edit/' + idNeedEdit, employeeDTO);
  }

  deleteEmployeeService(idDelete: any): Observable<any> {
    return this.http.delete(this.API + '/delete/' + idDelete);
  }

  // --------------------------- Search ----------------------------------
  searchEmployeeFullNameService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/searchFullName/' + idSearch);
  }

  searchEmployeePhoneNumberService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/searchPhoneNumber/' + idSearch);
  }

  searchEmployeeEmailService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/searchEmail/' + idSearch);
  }

  validateWhiteSpace(control: AbstractControl) {
    if (control.value !== '') {
      const isWhiteSpace = control.value.trim().length === 0;
      if (isWhiteSpace) {
        const isValid = !isWhiteSpace;
        return isValid ? null : {whiteSpace: true};
      }
    }
  }

  validateSpecialCharacter(control: AbstractControl) {
    const specialCharacter = '[~`!@#$%^&*()-+=/*?:;.,|]+';
    return (control.value.match(specialCharacter)) ? {
      specialCharacter: true
    } : null;
  }

  // Trần  Đạt - validate số điện thoại.
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
  }
  checkAge: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const birthday = new Date(control.value);
    const timeBirth: number = birthday.getTime();
    const now = new Date().getTime();
    if (((now - timeBirth) / 365.25 / 24 / 60 / 60 / 1000) < 18) {
      return {checkAge: true};
    }
    return null;
  }
  searchEmployee(inputSearch: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('valueSearch', inputSearch);
    return this.http.get<any>(this.API + '/inputSearch', {params});
  }
}
