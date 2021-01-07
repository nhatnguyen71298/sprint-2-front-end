import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  public API_STATISTICS = 'http://localhost:8080/statistic';

  constructor(public http: HttpClient) {
  }

  // Thống kê số lượng các hãng xe đang có tại bãi
  getToltalCarTypeParkingSlot(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-car-type-parking-slot');
  }

  // Thống kê số lượng khách hàng
  getTotalCustomer(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-customer');
  }

  // Thống kê số lượng nhân viên
  getTotalEmployee(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-employee');
  }

  // Thống kê số lượng xe đang có tại bãi
  getTotalCarParking(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-car-parking');
  }

  // Thống kê tổng số lượng ví trí đỗ xe của bãi
  getTotalParkingSlot(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-parking-slot');
  }

  // Thống kê tổng số lượng vé mỗi loại theo tuần tháng năm
  getTotalMemberCardType(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-member-card-type');
  }

  // Thống kê số lượng xe của mỗi khách hàng
  getTotalCarOfCustomer(): Observable<any> {
    return this.http.get(this.API_STATISTICS + '/total-car-of-customer');
  }

  //  Thống kê số lượng khách hàng đăng ký trong khoảng thời gian
  getToTalCustomerRegisterPeriod(day): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-customer-register-period', day);
  }

  // Thống kê doanh thu trong khoảng thời gian (member card)
  getTotalRevenueMemberCardPeriod(day): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-revenue-member-card-period', day);
  }

  // Thống kê doanh thu trong khoảng thời gian (ticket)
  getTotalRevenueTicketPeriod(day): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-revenue-ticket-period', day);
  }

  // Thống kê số lượng vé theo tuần (member card)
  getTotalMemberCardWeek1(monthYear): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-member-card-week1', monthYear);
  }

  getTotalMemberCardWeek2(monthYear): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-member-card-week2', monthYear);
  }

  getTotalMemberCardWeek3(monthYear): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-member-card-week3', monthYear);
  }

  getTotalMemberCardWeek4(monthYear): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-member-card-week4', monthYear);
  }

  // Thống kê số lượng vé theo tháng (member card)
  getTotalMemberCardMonth(monthYear): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-member-card-month', monthYear);
  }

  // Thống kê số lượng vé theo năm (member card)
  getTotalMemberCardYear(year): Observable<any> {
    return this.http.post(this.API_STATISTICS + '/total-member-card-year', year);
  }
}
