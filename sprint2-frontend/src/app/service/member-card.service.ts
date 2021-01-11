import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {MemberCardAddDTO} from '../model/MemberCardAddDTO';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map, switchMap} from 'rxjs/operators';

const URL = 'http://localhost:8080/member-card';

@Injectable({
  providedIn: 'root'
})
export class MemberCardService {
  private readonly API = 'http://localhost:8080/member-card';

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    // responseType: 'text' as 'json'
  };


  constructor(private http: HttpClient) {
  }

  // Lanh start
  getMemberCardList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/list`, this.options);
  }

  createNewMemberCard(memberCardAddDTO: MemberCardAddDTO): Observable<any> {
    return this.http.post(`${this.API}/add`, memberCardAddDTO);
  }

  getMemberCardType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/member-card-type`);
  }

  getParkingSlot(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/parking-slot`);
  }


  validatePlateNumber(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.search(control.value)
        .pipe(
          map(res => {
            if (res.length) {
              return {plateNumberExists: true};
            }
          })
        );
    };
  }

  search(text) {
    return timer(100)
      .pipe(
        switchMap(() => {
          return this.http.get<any>(`${URL}/find-plate-number/${text}`);
        })
      );
  }

  validateWhiteSpace(control: AbstractControl) {
    if (control.value !== '') {
      const isWhiteSpace = control.value.trim().length === 0;
      if (isWhiteSpace) {
        const isValid = !isWhiteSpace;
        return isValid ? null : {whiteSpace: true};
      }
    }
  }

  validateSpecialCharacter(control: AbstractControl) {
    const specialCharacter = '[~`!' +
      '@#$%^&*()-+=/*?:;.,|]+';
    return (control.value.match(specialCharacter)) ? {
      specialCharacter: true
    } : null;
  }


  searchPlateNumber(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/search-plate-number/' + idSearch);
  }

  // Lanh end

  // Hoat start
  findMemberCardByIdService(idMemberCard): Observable<any> {
    return this.http.get(this.API + '/' + 'find-by-id/' + idMemberCard);
  }

  deleteMemberCardService(idMemberCard): Observable<any> {
    return this.http.delete(this.API + '/delete/' + idMemberCard);
  }

  editTicketService(editForm): Observable<any> {
    return this.http.put(this.API + '/edit', editForm);
  }

  getParkingSlotEdit(slotType): Observable<any> {
    return this.http.get(this.API + '/slot-type-edit/' + slotType);
  }

  // Hoat end
}
