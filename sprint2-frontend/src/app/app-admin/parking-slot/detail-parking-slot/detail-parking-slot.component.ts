import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-parking-slot',
  templateUrl: './detail-parking-slot.component.html',
  styleUrls: ['./detail-parking-slot.component.css']
})
export class DetailParkingSlotComponent implements OnInit {
  public ele;
  constructor(public dialogRef: MatDialogRef<DetailParkingSlotComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any) { }

  ngOnInit(): void {
    console.log(this.data.data1);
    this.ele = this.data.data1;
  }

}
