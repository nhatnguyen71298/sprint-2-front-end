import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class NganService {
  public apiGet = 'http://localhost:8080/customer/getAll';
  public apiAdd = 'http://localhost:8080/customer/addNewCustomer';
  public apiFindCar = 'http://localhost:8080/customer/finAllCarType';
  public apiFindMemberType = 'http://localhost:8080/customer/findAllMemberType';
  public apiGetCustomer = 'http://localhost:8080/customer/getCustomer';
  constructor(
    public http: HttpClient
  ) {
  }
  public getAll(): Observable<any> {
    return this.http.get(this.apiGet);
  }
  public addNewCustomer(customer): Observable<any> {
    return this.http.post(this.apiAdd, customer);
  }
  public findAllCarType(): Observable<any> {
    return this.http.get(this.apiFindCar);
  }
  public findAllMemberType(): Observable<any> {
    return this.http.get(this.apiFindMemberType);
  }

  search(input, key, currentPage): Observable<any> {
    console.log(input, key);
    return this.http.get(this.apiGetCustomer + '/' + input + '/' + key);
  }
  validateWhitespace(c: AbstractControl) {
    if (c.value !== '') {
      const isWhitespace = c.value.trim().length === 0;
      if (isWhitespace) {
        const isValid = !isWhitespace;
        return isValid ? null : {whitespace: true};
      }
    }
  }
}
