import { Component, OnInit } from '@angular/core';
import {MaiService} from "../../../service/mai.service";

@Component({
  selector: 'app-list-parking-slot',
  templateUrl: './list-parking-slot.component.html',
  styleUrls: ['./list-parking-slot.component.css']
})
export class ListParkingSlotComponent implements OnInit {
  p: number;
  public list = [];
  public keywordSearch: string;
  public checkList = 'true';
  public reverse = true;
  public key;
  public test = 'first';

  constructor(
    public parkingSlotService: MaiService,
  ) {
  }

  ngOnInit(): void {
    this.parkingSlotService.getAllParkingLotService().subscribe(data => {
      this.list = data;
    });
    this.keywordSearch = '';
  }

  searchFloor() {
    if (this.keywordSearch !== '') {
      if (this.keywordSearch.match('^([0-9]+)*$')) {
        this.keywordSearch = this.keywordSearch.trim();
        this.parkingSlotService.searchParkingSlotFloorService(this.keywordSearch).subscribe(data => {
          this.list = data;
          if (this.list.length === 0) {
            this.checkList = 'false';
          }
        });
      } else {
        alert('Vui lòng chỉ nhập số tầng bạn muốn tìm kiếm!');
        this.resetSearch();
      }
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm');
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.searchFloor();
    }
  }

  resetSearch() {
    this.keywordSearch = '';
    this.checkList = 'true';
    this.ngOnInit();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  changePage(p) {
    if (p !== 1) {
      this.test = 'second';
    } else {
      this.test = 'first';
    }
  }
}
