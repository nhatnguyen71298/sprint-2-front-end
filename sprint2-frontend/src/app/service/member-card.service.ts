import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberCardService {
  private readonly API: string = 'http://localhost:8080/member-card';
  constructor(
    public http: HttpClient
  ) { }
  getAllMemberCard(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
  findMemberCardByIdService(idMemberCard): Observable<any> {
    return this.http.get(this.API + '/' + 'findByMemberCardById/' + idMemberCard);
  }
  deleteMemberCardService(idMemberCard): Observable<any> {
    return this.http.delete(this.API + '/deleteMemberCard/' + idMemberCard);
  }
  editTicketService(editForm): Observable<any> {
    return this.http.put(this.API + '/edit', editForm );
  }
}
