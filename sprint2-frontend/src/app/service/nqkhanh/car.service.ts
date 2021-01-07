import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(public http: HttpClient) {
  }

  public API_FIND_CAR_BY_CUSTOMER = 'http://localhost:8080/car/find-all-car-by-customerId/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

  // tslint:disable-next-line:ban-types
  getOptions(page?: number): Object {
    let options = {
      headers : this.httpOptions.headers,
      params : {
        page: page,
      }
    };
    return options;
  }

  getAllCarByCustomerId(idCustomer: number, page?: number): Observable<any> {
    return this.http.get(this.API_FIND_CAR_BY_CUSTOMER + idCustomer, this.getOptions(page));
  }
}
