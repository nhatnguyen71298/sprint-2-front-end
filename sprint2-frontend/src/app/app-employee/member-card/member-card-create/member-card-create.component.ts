import {Component, ElementRef, OnInit} from '@angular/core';
import {MemberCardService} from '../../../service/member-card.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemberCardAddDTO} from '../../../model/MemberCardAddDTO';
import {Router} from '@angular/router';
import {OpenParkingMapComponent} from '../../entry-management/open-parking-map/open-parking-map.component';

@Component({
  selector: 'app-member-card-create',
  templateUrl: './member-card-create.component.html',
  styleUrls: ['./member-card-create.component.css']
})
export class MemberCardCreateComponent implements OnInit {
  public memberCardForm: FormGroup;
  memberType: any;
  parkingSlotList: any;
  private memberCardAddDTO: MemberCardAddDTO = {
    plateNumber: null,
    fullName: null,
    memberTypeID: null,
    startDate: null,
    endDate: null,
    // floor: null,
    slotNumber: null,
    price: null,
  };
  radio: string;
  public startDateInput;
  public endDateAuto;
  public type: string;
  public priceInput: number;


  constructor(private memberCardService: MemberCardService,
              private httpClient: HttpClient,
              private router: Router,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    this.memberCardForm = this.formBuilder.group({
      plateNumber: ['',
        [Validators.required, Validators.pattern('^([A-Z]|\\d){6,10}$')],
        [this.memberCardService.validatePlateNumber()], {updateOn: 'blur'}
      ],

      fullName: ['',
        [Validators.required, this.memberCardService.validateWhiteSpace,
          this.memberCardService.validateSpecialCharacter, Validators.maxLength(40)
        ]],

      memberTypeID: ['', [Validators.required]],
      startDate: ['16/01/2021', [Validators.required]],
      endDate: ['', [Validators.required]],
      // floor: ['', [Validators.required]],
      slotNumber: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.memberCardService.getMemberCardType().subscribe(value =>
      this.memberType = value, error => this.memberType = [],
    );
    this.memberCardService.getParkingSlot().subscribe(value => {
      // tslint:disable-next-line:no-unused-expression
      this.parkingSlotList = value, error => this.parkingSlotList = [];
    });
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.createMemberCard();
    }
  }

  createMemberCard() {
    this.memberCardForm.markAllAsTouched();
    if (this.memberCardForm.valid) {
      this.memberCardAddDTO = Object.assign({}, this.memberCardForm.value);
      this.memberCardService.createNewMemberCard(this.memberCardAddDTO).subscribe(data => {
        this.dialog.closeAll();
        this.router.navigateByUrl('/employee/member-card-list').then(_ => {
        });
      }, () => {
        const NOTICE = 'Thêm mới không thành công';
        this.router.navigate(['message-notice-member-card', {message: NOTICE}]).then(r => {
          setTimeout(() => {
              this.router.navigateByUrl('/employee/member-card-list');
            }, 1000
          );
        });
      });
    } else {
      for (const KEY of Object.keys(this.memberCardForm.controls)) {
        if (this.memberCardForm.controls[KEY].invalid) {
          const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
          INVALID_CONTROL.focus();
          break;
        }
      }
    }
  }

  close() {
    this.dialog.closeAll();
  }

  setEndDate() {
    console.log('vô');
    this.startDateInput = new Date(this.startDateInput);
    this.endDateAuto = new Date(this.startDateInput);
    if (this.radio === 'Tuần') {
      this.priceInput = 140000;
      this.endDateAuto.setDate(this.startDateInput.getDate() + 7);
      this.memberCardForm.controls.memberTypeID.setValue(1);
    } else if (this.radio === 'Tháng') {
      this.priceInput = 30 * 20000;
      this.endDateAuto.setDate(this.startDateInput.getDate() + 30);
      this.memberCardForm.controls.memberTypeID.setValue(2);
    } else if (this.radio === 'Năm') {
      this.priceInput = 365 * 20000;
      this.endDateAuto.setDate(this.startDateInput.getDate() + 365);
      this.memberCardForm.controls.memberTypeID.setValue(3);
    }
  }

  openMap() {
    const dialogA = this.dialog.open(OpenParkingMapComponent, {
      width: '800px',
    });
  }
}
