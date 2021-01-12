import {Component, OnInit} from '@angular/core';
import {CustomerDeleteComponent} from '../customer-delete/customer-delete.component';
import {MatDialog} from '@angular/material';
import {HoangService} from '../../../service/hoang.service';
import {CustomerViewComponent} from '../customer-view/customer-view.component';
import {CustomerEditComponent} from '../customer-edit/customer-edit.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(
    public customerService: HoangService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openDialogDelete(customerId): void {
    console.log(customerId);
    this.customerService.getCustomerById(customerId).subscribe(dataOfCustomer => {
      console.log(dataOfCustomer);
      const dialogRef = this.dialog.open(CustomerDeleteComponent, {
        width: '500px',
        data: {data1: dataOfCustomer},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  openDialogView(customerId): void {
    this.customerService.getCustomerById(customerId).subscribe(dataOfCustomer => {
      const dialogRef = this.dialog.open(CustomerViewComponent, {
        // chỉnh full dialog
        panelClass: 'app-full-bleed-dialog',
        width: '800px',
        // height: '90%',
        data: {data1: dataOfCustomer},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  openDialogEdit(customerId): void {
    this.customerService.getCustomerById(customerId).subscribe(dataOfCustomer => {
      const dialogRef = this.dialog.open(CustomerEditComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '800px',
        data: {data1: dataOfCustomer},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

}
