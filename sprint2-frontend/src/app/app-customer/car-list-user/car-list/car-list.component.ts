import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CarService} from "../../../service/nqkhanh/car.service";
import {CustomerService} from "../../../service/nqkhanh/customer.service";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  public customerId;
  public lisCar: Observable<any>;
  public totalElements: number;
  public pageSize: number;
  public currentPage = 0;

  constructor(public carService: CarService, public  customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getPage(1);
    console.log(this.currentPage);
  }

  getPage(page: number) {
    this.customerService.getCustomerByAccountId(1).subscribe(dataCustomer => {
      this.customerId = dataCustomer.id;
      this.lisCar = this.carService.getAllCarByCustomerId(this.customerId, page).pipe(
        tap(res => {
          this.totalElements = res.totalElements;
          this.pageSize = res.size;
          this.currentPage = page;
          console.log(this.currentPage);
        }),
        map(res => res.content)
      );
    });
  }
}
