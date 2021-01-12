import {Component, ElementRef, OnInit} from '@angular/core';
import {ParkingSlotService} from "../../../service/parking-slot.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-parking-slot',
  templateUrl: './edit-parking-slot.component.html',
  styleUrls: ['./edit-parking-slot.component.css']
})
export class EditParkingSlotComponent implements OnInit {
  public formUpdate: FormGroup;
  public slotTypeList;
  public width;
  public height;
  private eleId: number
  public slotTypeInput = 0;

  constructor(private parkingSlotService: ParkingSlotService,
              private formBuilder: FormBuilder,
              private router: Router,
              private el: ElementRef, private route: ActivatedRoute,
              private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.parkingSlotService.getAllSlotType().subscribe(dataType => {
      this.slotTypeList = dataType;
    });
    this.formUpdate = this.formBuilder.group({
      floor: ['', [Validators.required, Validators.pattern('^\\d{1,2}$'), Validators.max(6)]],
      slotNumber: ['', [Validators.required, Validators.pattern('^\\d{1,2}$'),
        Validators.max(50)]],
      slotName: ['', [Validators.required]],
      width: [300,[Validators.required,Validators.pattern('^\\d+$') , Validators.min(300) , Validators.max(10000)]],
      height: [300, [Validators.required, Validators.pattern('^\\d+$'), Validators.min(300), Validators.max(10000)]]
    });
    // only for Edit
    this.route.params.subscribe(data => {
        this.eleId = data.id;
        this.parkingSlotService.getById(this.eleId).subscribe(dataFromServer => {
          this.formUpdate.patchValue(dataFromServer);
          this.displayHeightWidth(dataFromServer.slotName)
        });
      }
    );
  }

  public update() {
    this.formUpdate.markAllAsTouched();
    if (this.formUpdate.valid) {
      this.parkingSlotService.updateParkingSlot(this.eleId, this.formUpdate.value).subscribe(value => {
        if (value === 1) {
          this.router.navigate(['admin/list-parking-slot'], {
            // queryParams: {
            //   create_msg: 'Create successfully!',
            //   si: true
            // }
          });
          console.log(this.formUpdate.controls);
        this.toast.success('Thao Tác Thành Công','Thông Báo');
        } else{
          this.toast.error('Thao Tác Thất Bại Vị Trí Đã Tồn Tại Trong Tầng', 'Thông Báo');
        }
      });
    } else{
      for (const KEY of Object.keys(this.formUpdate.controls)) {
        if (this.formUpdate.controls[KEY].invalid) {
          const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
          INVALID_CONTROL.focus();
          break;
        }
      }
    }
  }

  displayHeightWidth(variable) {
    for (const element of this.slotTypeList) {
      if (variable === element.slotName) {
        this.formUpdate.value.slotType = element.id;
        this.slotTypeInput = element.id;
        this.height = element.height;
        this.width = element.width;
        this.formUpdate.controls.width.setValue(element.width);
        this.formUpdate.controls.height.setValue(element.height);
        break;
      }
    }
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.update();
    }
  }
}
