import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppAccount} from './model/AppAccount';

@Injectable({
  providedIn: 'root'
})
export class QuanService {
  readonly API = 'http://localhost:8080/authenticate';
  readonly API2 = 'http://localhost:8080/hello';
  API_URL = 'http://localhost:8080/account/';

  name: Subject<string> = new Subject();
  private currentUserSubject: BehaviorSubject<AppAccount>;
  public currentUser: Observable<AppAccount>;
  parsingUser;

  broadcastLoginChange(text: string) {
    this.name.next(text);
  }

  constructor(public http: HttpClient) {
    this.parsingUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<AppAccount>(this.parsingUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AppAccount {
    return this.currentUserSubject.value;
  }

  login(credentials): Observable<any> {
    return this.http.post(this.API_URL + 'login', credentials);
  }

  authenticate(account): Observable<any> {
    return this.http.post<any>(this.API_URL + 'login', account)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  hello(): Observable<any> {
    return this.http.get(this.API2);
  }
}
