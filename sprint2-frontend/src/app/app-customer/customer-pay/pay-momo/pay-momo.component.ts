import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-pay-momo',
  templateUrl: './pay-momo.component.html',
  styleUrls: ['./pay-momo.component.css']
})
export class PayMomoComponent implements OnInit {
  public message;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.message = this.data.notification;
  }
}
