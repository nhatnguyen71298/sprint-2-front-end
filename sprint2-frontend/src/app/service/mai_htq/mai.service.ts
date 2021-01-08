import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:8080/parking-slot';

@Injectable({
  providedIn: 'root'
})
export class MaiService {
  public readonly API: string = 'http://localhost:8080/parking-slot';
  public readonly API_SLOT_TYPE: string = 'http://localhost:8080/parking-slot/slot-type';

  constructor(
    public http: HttpClient
  ) {
  }

  getAllParkingLotService(): Observable<any> {
    return this.http.get(this.API + '/list');
  }

  getAllSlotType(): Observable<any> {
    return this.http.get(this.API_SLOT_TYPE);
  }

  createParkingLotService(parkingSlot): Observable<any> {
    return this.http.post(this.API + '/create', parkingSlot);
  }

  searchParkingSlotFloorService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/search-floor/' + idSearch);
  }

  searchValidate(slotNumber, floorInput): Observable<any> {
    return this.http.get(this.API + '/find-parking-slot-by-slot-number-floor/' + slotNumber + '/' + floorInput);
  }
}
