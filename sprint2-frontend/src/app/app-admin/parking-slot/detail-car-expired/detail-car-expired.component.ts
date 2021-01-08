import {Component, Inject, OnInit} from '@angular/core';
import {ParkingSlotService} from "../../../service/parking-slot.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-car-expired',
  templateUrl: './detail-car-expired.component.html',
  styleUrls: ['./detail-car-expired.component.css']
})
export class DetailCarExpiredComponent implements OnInit {
  public ele;

  constructor(public dialogRef: MatDialogRef<DetailCarExpiredComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data.data1);
    this.ele = this.data.data1;
  }

}
