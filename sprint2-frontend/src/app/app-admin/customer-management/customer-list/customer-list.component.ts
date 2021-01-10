import { Component, OnInit } from '@angular/core';
import {NganService} from '../../../service/ngan-service.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private currentPage = 0;
  private pages: Array<number>;
  public hidePre = false;
  public hideNext = false;
  public customerList;
  term: string;
  p: any;
  key: any;
  input: any;
  constructor(
    public nganService: NganService
  ) {
  }

  ngOnInit() {
    this.nganService.getAll().subscribe(data => {
      this.customerList = data;
    });
  }

  getCustomer() {
    this.nganService.search(this.input, this.key, this.currentPage).subscribe(data => {
      this.customerList = data;
      this.pages = new Array(data.totalPages);
      if (this.currentPage === 0) {
        this.hidePre = true;
      } else {
        this.hidePre = false;
      }
      if (this.currentPage === this.pages.length - 1) {
        this.hideNext = true;
      } else {
        this.hideNext = false;
      }
    });
  }

  previousClick() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.ngOnInit();
    }
  }

  nextClick() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.ngOnInit();
    }
  }

  getPaginationWithIndex(i: any) {
    this.currentPage = i;
    this.ngOnInit();
  }
}
