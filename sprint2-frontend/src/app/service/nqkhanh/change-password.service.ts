import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  public API_FIND_APP_ACCOUNT = 'http://localhost:8080/account';
  public API_SET_VERITIFY = 'http://localhost:8080/account/setVerifyCode/';
  public API_CONFIRM_PASSWORD = 'http://localhost:8080/account/confirmPassword/';
  public API_CONFIRM_VERIFY = 'http://localhost:8080/account/veryficode/';
  public API_CHANGE_PASSWORD = 'http://localhost:8080/account/savePassword/';

  constructor(private http: HttpClient) {
  }

  findAppAccountById(idAppAccount: any): Observable<any> {
    return this.http.get(this.API_FIND_APP_ACCOUNT + '/findAppAccountById/' + idAppAccount);
  }

  setVerifyAndSendMail(idAccount): Observable<any> {
    // @ts-ignore
    return this.http.post(this.API_SET_VERITIFY + idAccount);
  }

  confirmPassword(idAccount, accountDTO): Observable<any> {
    return this.http.put(this.API_CONFIRM_PASSWORD + idAccount, accountDTO);
  }

  confirmVerifyCode(idAccount, accountDTO): Observable<any> {
    return this.http.put(this.API_CONFIRM_VERIFY + idAccount, accountDTO);

  }

  savePassword(idACount, accountDto): Observable<any> {
    return this.http.put(this.API_CHANGE_PASSWORD + idACount, accountDto);
  }
}
