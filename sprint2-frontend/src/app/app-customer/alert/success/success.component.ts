import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  check;

  constructor(private dialogRef: MatDialogRef<SuccessComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.check = this.data.check;
    console.log(this.check);
  }

  cancel() {
    this.dialogRef.close();
  }
}
