import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  API_TICKET_SAVE = 'http://localhost:8080/ticket/save';
  API_TICKET_CLOSE = 'http://localhost:8080/ticket/close';
  API_SLOT_FIND_ALL = 'http://localhost:8080/parking-slot/find-all';
  API_SLOT_FIND_BY_FLOOR_SLOT = 'http://localhost:8080/parking-slot/find-by-floor-slot-number';
  API_CAR_FIND_BY_PLATE = 'http://localhost:8080/car/get-info';
  API_CAR_TYPE_ALL = 'http://localhost:8080/car/find-all-type';

  constructor(private http: HttpClient) { }

  saveTicket(ticket): Observable<any> {
    return this.http.post(this.API_TICKET_SAVE, ticket);
  }

  closeTicket(ticket): Observable<any> {
    return this.http.post(this.API_TICKET_CLOSE, ticket);
  }

  findCar(car): Observable<any> {
    return this.http.post(this.API_CAR_FIND_BY_PLATE, car);
  }

  findAllSlot(): Observable<any> {
    return this.http.get(this.API_SLOT_FIND_ALL);
  }

  findSlot(slot): Observable<any> {
    return this.http.post(this.API_SLOT_FIND_BY_FLOOR_SLOT, slot);
  }

  findAllCarType(): Observable<any> {
    return this.http.get(this.API_CAR_TYPE_ALL);
  }
}
