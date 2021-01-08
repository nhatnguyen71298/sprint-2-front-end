import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public API_FIND_CUSTOMER_BY_ACCOUNTID = 'http://localhost:8080/customer';

  constructor(public http: HttpClient) {
  }

  getCustomerByAccountId(idAccount): Observable<any> {
    return this.http.get(this.API_FIND_CUSTOMER_BY_ACCOUNTID + '/find-customer-by-accountId/' + idAccount);
  }
}
