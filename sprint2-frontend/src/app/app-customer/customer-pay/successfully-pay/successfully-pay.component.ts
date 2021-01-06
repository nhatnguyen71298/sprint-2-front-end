import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-successfully-pay',
  templateUrl: './successfully-pay.component.html',
  styleUrls: ['./successfully-pay.component.css']
})
export class SuccessfullyPayComponent implements OnInit {
  public message;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.message = this.data.notification;
  }

}
