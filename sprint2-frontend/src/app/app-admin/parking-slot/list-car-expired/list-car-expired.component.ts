import { Component, OnInit } from '@angular/core';
import {ParkingSlotService} from "../../../service/parking-slot.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {DetailParkingSlotComponent} from "../detail-parking-slot/detail-parking-slot.component";
import {DetailCarExpiredComponent} from "../detail-car-expired/detail-car-expired.component";

@Component({
  selector: 'app-list-car-expired',
  templateUrl: './list-car-expired.component.html',
  styleUrls: ['./list-car-expired.component.css']
})
export class ListCarExpiredComponent implements OnInit {
  public list = [];
  p: number;
  public test = 'first';
  public checkList = 'true';
  constructor(private parkingSlotService: ParkingSlotService,
              public dialog: MatDialog,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.parkingSlotService.getAllCarExpiredService().subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  openViewDialog(id: number): void {
    this.parkingSlotService.getDetailCardExpired(id).subscribe(dataFromServer =>{
      const dialogRef = this.dialog.open(DetailCarExpiredComponent, {
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
  changePage(p: number) {
    if (p !== 1) {
      this.test = 'second';
    } else {
      this.test = 'first';
    }
  }
}
