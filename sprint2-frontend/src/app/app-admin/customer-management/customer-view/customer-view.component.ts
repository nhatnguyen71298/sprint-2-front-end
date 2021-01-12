import {Component, Inject, OnInit} from '@angular/core';
import {HoangService} from '../../../service/hoang.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Customer} from '../../../model/customer';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  public customer = new Customer();
  public view ;
  abc;

  constructor(public dialogRef: MatDialogRef<CustomerViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public customerService: HoangService,
  ) {
  }

  ngOnInit(): void {
    this.customer = this.data.data1;
    this.view = this.customer;
    if (this.view.gender === false) {
      this.view.gender = 'Nữ';
    } else {
      this.view.gender = 'Nam';
    }
  }

}
