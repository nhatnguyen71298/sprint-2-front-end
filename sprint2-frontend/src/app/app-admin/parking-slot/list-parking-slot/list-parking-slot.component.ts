import { Component, OnInit } from '@angular/core';
import {MaiService} from '../../../service/mai.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ParkingSlotService} from '../../../service/parking-slot.service';
import {DetailParkingSlotComponent} from '../detail-parking-slot/detail-parking-slot.component';

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
    public parkingSlotService1: ParkingSlotService,
    public dialog: MatDialog,
    private route: ActivatedRoute
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
        this.parkingSlotService.searchParkingLotFloorService(this.keywordSearch).subscribe(data => {
          this.list = data;
          if (this.list.length === 0) {
            this.checkList = 'false';
          }
        });
      } else {
        alert('Vui lòng nhập từ khóa không có khoảng trắng thừa!');
        this.resetSearch();
      }
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm');
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      console.log(event.keyCode);
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
  openViewDialog(id: number): void {
    this.parkingSlotService1.getById(id).subscribe(dataFromServer => {
      const dialogRef = this.dialog.open(DetailParkingSlotComponent, {
        width: '850px',
        disableClose: true,
        data: {data1: dataFromServer}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }
}
