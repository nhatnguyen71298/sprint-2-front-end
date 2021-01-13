import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppAccount} from '../../../model/AppAccount';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  id;
  name;
  private currentUserSubject: BehaviorSubject<AppAccount>;
  parsingUser;

  constructor() {
    this.parsingUser = JSON.parse(window.sessionStorage.getItem('USER_KEY'));
    this.currentUserSubject = new BehaviorSubject<AppAccount>(this.parsingUser);
  }

  broadcastLoginChange(text: string) {
    this.name.next(text);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): any {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    this.id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  public getIdAppAccount() {
    return this.id;
  }
}
