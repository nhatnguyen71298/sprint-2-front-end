import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


class Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  birthday: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
  role: string;
}
const URL = 'http://localhost:8080/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public readonly API: string = 'http://localhost:8080/employee';
  constructor(
    public http: HttpClient
  ) {
  }
  // Create by: Đạt
  getAllEmployeeService(): Observable<any> {
    return this.http.get(this.API + '/list');
  }

  getAllRole(): Observable<any> {
    return this.http.get(this.API + '/listRole');
  }

  findEmployeeByIdService(idFind: any): Observable<any> {
    return this.http.get(this.API + '/findEmployeeById/' + idFind);
  }

  createNewEmployeeService(employeeDTO: Employee): Observable<any> {
    return this.http.post(this.API + '/createNew', employeeDTO);
  }

  editEmployeeService(employeeDTO, idNeedEdit): Observable<any> {
    return this.http.put(this.API + '/editEmployee/' + idNeedEdit, employeeDTO);
  }

  deleteEmployeeService(idDelete: any): Observable<any> {
    return this.http.delete(this.API + '/delete/' + idDelete);
  }

  // --------------------------- Search ----------------------------------
  searchEmployeeFullNameService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/searchFullName/' + idSearch);
  }

  searchEmployeePhoneNumberService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/searchPhoneNumber/' + idSearch);
  }

  searchEmployeeEmailService(idSearch: any): Observable<any> {
    return this.http.get(this.API + '/searchEmail/' + idSearch);
  }
}
