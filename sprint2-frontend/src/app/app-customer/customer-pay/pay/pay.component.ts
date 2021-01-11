import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SuccessfullyPayComponent} from "../successfully-pay/successfully-pay.component";
import {PayService} from "../../../service/pay.service";
import {ActivatedRoute} from "@angular/router";
import {PayMomoComponent} from "../pay-momo/pay-momo.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public message = 'nothing';
  public memberCardList = [];
  public memberCardListPay = [];
  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  public totalMoneyPayPal = 0;
  public totalMoneyMoMo = 0;
  public isChecked: boolean;
  private idCustomer;

  constructor(
    private payService: PayService,
    private dialog: MatDialog,
    protected http: HttpClient,
    private activedRouter: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.displayPayPalButton();
    this.getListMemberCard();
  }

  getListMemberCard() {
    this.activedRouter.params.subscribe(data => {
      this.idCustomer = data.idCustomer;
    });
    this.payService.getListMemberCardByIDCustomer(this.idCustomer).subscribe(
      (data) => {
        this.memberCardList = data;
      },
      () => {
        this.message = 'error';
      },
      () => {
      });
  }

  displayPayPalButton() {
    paypal.Buttons(
      {
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
          label: 'paypal',
          height: 55,
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalMoneyPayPal,
                  currency_code: 'USD'
                }
              }
            ]
          });
        },

        onCancel(data) {
          alert('Yêu cầu hủy thanh toán thành công!');
          console.log('Đã hủy.');
        },

        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            this.snackBar.open('Thông tin đang cập nhật. Vui lòng đợi trong giây lát!', 'OK', {
              duration: 2500
            });
            this.updateMemberCard();
          });
        },

        onError: (data, actions) => {
          this.refresh();
          this.snackBar.open('Lỗi hệ thống. Quý khách vui lòng liên hệ nhân viên để khắc phục. ' +
            'Mong quý khách thông cảm! Xin cảm ơn!', 'OK', {
            duration: 1000
          });
          console.log('Lỗi hệ thống.');
        }
      }
    ).render(this.paypalRef.nativeElement);
  }

  payNothing() {
    this.snackBar.open('Vui lòng chọn vé trước khi thanh toán!', 'OK', {
      duration: 1000
    });
  }

  onCheckboxChange($event: Event, memberCard) {
    // @ts-ignore
    this.isChecked = $event.target.checked;
    if (this.isChecked) {
      this.totalMoneyPayPal = Math.ceil(this.totalMoneyPayPal + memberCard.price / 23000);
      this.totalMoneyMoMo = this.totalMoneyMoMo + memberCard.price;
      this.memberCardListPay.push(memberCard.id);
    } else {
      this.totalMoneyPayPal = Math.ceil(this.totalMoneyPayPal - memberCard.price / 23000 - 1);
      this.totalMoneyMoMo = this.totalMoneyMoMo - memberCard.price;
      for (let i = 0; i < this.memberCardListPay.length; i++) {
        if (this.memberCardListPay[i] === memberCard.id) {
          this.memberCardListPay.splice(i, i + 1);
        }
      }
    }
  }

  payByMoMo() {
    const dialogRef = this.dialog.open(PayMomoComponent, {
      width: '555px',
      height: '505px',
      data: {notification: 'repair'},
      disableClose: true
    });
  }

  updateMemberCard() {
    this.payService.updateMemberCardAfterPay(this.totalMoneyMoMo, this.memberCardListPay)
      .subscribe(
        (data) => {
        },
        () => {
          this.openSuccessfullyPay('failed');
        },
        () => {
          this.openSuccessfullyPay('complete');
        });
  }

  openSuccessfullyPay(message): void {
    const dialogRef = this.dialog.open(SuccessfullyPayComponent, {
      width: '555px',
      height: '235px',
      data: {notification: message},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.memberCardListPay.splice(0, this.memberCardListPay.length);
    this.totalMoneyPayPal = 0;
    this.totalMoneyMoMo = 0;
    this.getListMemberCard();
  }
}
