import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../service/lvq-din/customer.service';

@Component({
  selector: 'app-list-entry-log',
  templateUrl: './list-entry-log.component.html',
  styleUrls: ['./list-entry-log.component.css']
})
export class ListEntryLogComponent implements OnInit {
  listEntryLog;
  STT = 0;
  searchPlate = '';

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.STT += 1;
    this.customerService.getListEntryLog('1', '0').subscribe(data => {
        this.listEntryLog = data;
      }
    );
  }

  searchOneWayPage(page: number, search) {
    if (page === undefined) {
      page = 0;
    }
    this.searchPlate = search.trim();
    if (this.searchPlate === '') {
      this.customerService.getListEntryLog('1', page).subscribe(data => {
          this.listEntryLog = data;
        }
      );
    } else {
      this.customerService.getListEntryLogPlate('1', page, this.searchPlate).subscribe(data => {
        this.listEntryLog = data;
      })
    }
    // Tạo vòng for in
  }

  createFor(lenght: any) {
    const array = [];
    for (let i = 0; i < lenght; i++) {
      array.push(i);
    }
    // @ts-ignore
    return array;
  }
}
