import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-statistic-notify',
  templateUrl: './statistic-notify.component.html',
  styleUrls: ['./statistic-notify.component.css']
})
export class StatisticNotifyComponent implements OnInit {
  timeout = 4000;

  constructor(public dialogRef: MatDialogRef<StatisticNotifyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.dialogRef.close();
      }, this.timeout)
    });
  }

}
