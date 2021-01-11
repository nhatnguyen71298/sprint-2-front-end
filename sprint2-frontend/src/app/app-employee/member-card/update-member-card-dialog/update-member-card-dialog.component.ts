import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MemberCardService} from '../../../service/member-card.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-member-card-dialog',
  templateUrl: './update-member-card-dialog.component.html',
  styleUrls: ['./update-member-card-dialog.component.css']
})
export class UpdateMemberCardDialogComponent implements OnInit {

  public formEdit: FormGroup;
  public memberCard;
  public b: number;
  private el: ElementRef;
  radio: string;
  public startDateInput;
  public endDateAuto;
  public type: string;
  public priceInput: number;

  constructor(protected dialogRef: MatDialogRef<UpdateMemberCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              protected formBuilder: FormBuilder,
              public memberCardService: MemberCardService,
              protected router: Router) {
  }

  ngOnInit() {
    this.memberCard = this.data.dataMemberCard;
    this.endDateAuto = this.data.dataMemberCard.endDate;
    this.type = this.data.dataMemberCard.memberCardType.id;
    this.priceInput = this.data.dataMemberCard.price;
    this.formEdit = this.formBuilder.group({
      id: [this.data.dataMemberCard.id],
      idCar: [this.data.dataMemberCard.car.plateNumber],
      fullName: [this.data.dataMemberCard.car.customer.fullName],
      startDate: [this.data.dataMemberCard.startDate],
      endDate: [this.endDateAuto],
      price: [this.priceInput],
      numberSlot: [this.data.dataMemberCard.car.parkingSlot.id, [Validators.required]],
      floor: [this.data.dataMemberCard.car.parkingSlot.floor, [Validators.required]],
      memberCardType: [this.type]
    });
    this.startDateInput = this.data.dataMemberCard.startDate;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.edit();
    }
  }

  edit() {
    if (this.formEdit.valid) {
      this.endDateAuto.setDate(this.endDateAuto.getDate() + 1);
      this.startDateInput.setDate(this.startDateInput.getDate() + 1);
      this.memberCardService.editTicketService(this.formEdit.value)
        .subscribe(
          data => {
          },
          () => {
            // const NOTICE = 'Lỗi hệ thống';
            // this.router.navigate(['notice-page', {message: NOTICE}]).then(r => {
            // });
          }, () => {
            this.dialogRef.close();
          }
        );
    } else {
      for (const KEY of Object.keys(this.formEdit.controls)) {
        if (this.formEdit.controls[KEY].invalid) {
          const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
          INVALID_CONTROL.focus();
          break;
        }
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  setEndDate() {
    this.startDateInput = new Date(this.startDateInput);
    this.endDateAuto = new Date(this.startDateInput);
    if (this.radio === 'Tuần') {
      this.priceInput = 140000;
      this.endDateAuto.setDate(this.startDateInput.getDate() + 7);
      this.formEdit.controls.memberCardType.setValue(1);
    } else if (this.radio === 'Tháng') {
      this.priceInput = 30 * 20000;
      this.endDateAuto.setDate(this.startDateInput.getDate() + 30);
      this.formEdit.controls.memberCardType.setValue(2);
    } else if (this.radio === 'Năm') {
      this.priceInput = 365 * 20000;
      this.endDateAuto.setDate(this.startDateInput.getDate() + 365);
      this.formEdit.controls.memberCardType.setValue(3);
    }
  }
}
