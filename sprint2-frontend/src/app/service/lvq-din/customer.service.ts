import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // Đin
  api = 'http://localhost:8080/customer/';

  constructor(private http: HttpClient) {
  }

  updateCustomer(customer): Observable<any> {
    return this.http.put(this.api + 'update', customer);
  }

  getListEntryLog(id, page): Observable<any> {
    return this.http.get(this.api + 'list-entry-log/' + id + '/' + page);
  }

  getCustomerByAccount(accountId): Observable<any> {
    return this.http.get(this.api + 'find-by-account/' + accountId);
  }
  getListEntryLogPlate(id, page , search): Observable<any> {
    return this.http.get(this.api + 'list-entry-log/' + id + '/' + page + '/' + search);
  }

  // -- End
}
