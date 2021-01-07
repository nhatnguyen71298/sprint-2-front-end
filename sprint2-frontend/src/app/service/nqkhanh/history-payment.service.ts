import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryPaymentService {
  public API_HISTORY_PAYMENT = 'http://localhost:8080/invoice/find-all-invoice-by-customerId/';

  constructor(public http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };
  getOptions(page?: number): Object {
    let options = {
      headers : this.httpOptions.headers,
      params : {
        page: page,
      }
    };
    return options;
  }
  getAllInvoiceByCustomerId(idCustomer: number, page?: number): Observable<any> {
    return this.http.get(this.API_HISTORY_PAYMENT + idCustomer, this.getOptions(page));
  }
}
