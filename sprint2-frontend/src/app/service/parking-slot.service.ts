import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParkingSlotService {
  public readonly API: string = 'http://localhost:8080/parking-slot';
  public readonly API_SLOT_TYPE: string = 'http://localhost:8080/parking-slot/slot-type';
  public readonly API_CAR_EXPIRED: string = 'http://localhost:8080/member-card';
  constructor(public http: HttpClient) { }
  getAllParkingLotService(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
  getAllSlotType(): Observable<any> {

    return this.http.get(this.API_SLOT_TYPE);
  }
  getById(id): Observable<any>{
    return this.http.get(this.API + '/parkingSlot/' + id);
  }
  updateParkingSlot(id, data): Observable<any> {
    return this.http.put(`${this.API + '/updateParkingSlot'}/${id}`, data);
  }
  getAllCarExpiredService(): Observable<any> {
    return this.http.get(this.API_CAR_EXPIRED + '/memberCardExpired');
  }
  getDetailCardExpired(id): Observable<any>{
    return this.http.get(this.API_CAR_EXPIRED + '/detailCardExpired/' + id);
  }
}
