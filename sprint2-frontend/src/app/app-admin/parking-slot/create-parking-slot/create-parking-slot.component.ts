import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MaiService} from '../../../service/mai.service';

@Component({
  selector: 'app-create-parking-slot',
  templateUrl: './create-parking-slot.component.html',
  styleUrls: ['./create-parking-slot.component.css']
})
export class CreateParkingSlotComponent implements OnInit {
  public formCreateNew: FormGroup;
  public slotTypeList;
  public width;
  public height;
  public slotTypeInput = 0;

  constructor(
    private parkingSlotService: MaiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.parkingSlotService.getAllSlotType().subscribe(dataType => {
      this.slotTypeList = dataType;
    });
    this.formCreateNew = this.formBuilder.group({
      floor: ['', [Validators.required, Validators.pattern('^\\d+$'), Validators.max(5)]],
      slotNumber: ['', [Validators.required, Validators.pattern('^\\d+$'),
        Validators.max(50)]],
      slotType: [this.slotTypeInput]
    });
  }

  createParkingSlot() {
    this.formCreateNew.markAllAsTouched();
    if (this.formCreateNew.valid && this.slotTypeInput !== 0) {
      this.parkingSlotService.searchValidate(this.formCreateNew.value.slotNumber, this.formCreateNew.value.floor)
        .subscribe(dataSearch => {
          if (dataSearch != null) {
            alert('Vị trí đã tồn tại. Vui lòng nhập vị trí khác!');
          } else {
            this.parkingSlotService.createParkingLotService(this.formCreateNew.value).subscribe(data => {
              this.router.navigateByUrl('admin/list-parking-slot').then(_ => {
              });
            });
          }
        }, () => {
          this.router.navigateByUrl('admin/list-parking-slot').then(_ => {
            alert('Thêm mới không thành công');
          });
        });
    } else if (this.slotTypeInput === 0) {
      alert('Vui lòng nhập loại xe!');
      for (const KEY of Object.keys(this.formCreateNew.controls)) {
        if (this.formCreateNew.controls[KEY].invalid) {
          const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
          INVALID_CONTROL.focus();
          break;
        }
      }
    } else {
      console.log(this.formCreateNew);
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.createParkingSlot();
    }
  }

  displayHeightWidth(variable) {
    for (const element of this.slotTypeList) {
      if (variable === element.slotName) {
        this.formCreateNew.value.slotType = element.id;
        this.slotTypeInput = element.id;
        this.height = element.height;
        this.width = element.width;
        break;
      }
    }
  }
}
