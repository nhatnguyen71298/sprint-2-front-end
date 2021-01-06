import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhatService {
  public API = 'http://localhost:8080/api/7/post-src-image';
  constructor(
    public httpClient: HttpClient
  ) { }
  postNewImg(src): Observable<any> {
    return this.httpClient.post(this.API, src);
  }
}
