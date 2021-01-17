import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TicketService} from '../../../service/ticket.service';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.css']
})
export class EntryViewComponent implements OnInit {
  ticketForm: FormGroup;
  carTypes;
  message;
  plateNumberFromCamera;
  invalidMemberCard = false;
  memberCard;

  constructor(private formBuilder: FormBuilder,
              private ticketService: TicketService,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar,
              private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      enterDate: [],
      exitDate: [],
      plateNumber: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(10)]],
      price: [],
      fullName: [],
      email: [],
      carType: ['', Validators.required],
      floor: [],
      slot: [],
      startDate: [],
      endDate: []
    });
    this.ticketService.findAllCarType().subscribe(next => {
      this.carTypes = next;
    });
  }

  onSubmit() {
    const car2 = {
      plateNumber: this.ticketForm.value.plateNumber,
    };
    const endDate = this.ticketForm.value.endDate;
    this.ticketService.findCar(car2).subscribe(next3 => {
      if (next3.message !== 'Không tìm thấy xe') {
        this.ticketForm.reset();
        this.ticketForm.patchValue(car2);
        this.patchForm(next3);
      }
      if (this.ticketForm.valid) {
        const enterDate = new Date();
        const ticket = {
          enterDate,
          exitDate: this.ticketForm.value.exitDate,
          car: {
            plateNumber: this.ticketForm.value.plateNumber.trim(),
            carType: {
              carTypeName: this.ticketForm.value.carType,
            }
          }
        };
        const isRegistered = this.ticketForm.value.startDate !== '';
        const isValid = this.checkMemberCardValid(endDate);
        if (!isValid) {
          this.ticketService.unregisterCar(ticket.car.plateNumber).subscribe(next => {
            console.log(next);
          });
        }
        // if car not register or member card expired
        if (!isRegistered || !isValid) {
          this.ticketService.saveTicket(ticket).subscribe(next => {
            this.message = next.message;
            this.snackBar.open(this.message, 'OK', {
              duration: 1000
            });
            if (this.message === 'Xếp chỗ thành công') {
              const car = {
                plateNumber: this.ticketForm.value.plateNumber,
              };
              this.ticketService.findCar(car).subscribe(next2 => {
                this.patchForm(next2);
              });
            }
          });
        } else {
          // member card is valid
          const car = {
            plateNumber: this.ticketForm.value.plateNumber
          };
          this.ticketService.parkRegisteredCar(car).subscribe(next => {
            this.message = next.message;
            this.snackBar.open(this.message, 'OK', {
              duration: 1000
            });
          });
        }
      } else {
        this.focusFirstInvalid();
      }
    });

  }

  focusFirstInvalid() {
    for (const key of Object.keys(this.ticketForm.controls)) {
      if (this.ticketForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  findCar() {
    const car = {
      plateNumber: this.ticketForm.value.plateNumber,
    };
    this.ticketService.findCar(car).subscribe(next => {
      // car not found
      if (next.message != null) {
        this.message = next.message;
        this.snackBar.open(this.message, 'OK', {
          duration: 1000
        });
        this.ticketForm.reset();
        this.ticketForm.patchValue({plateNumber: car.plateNumber});
      } else {
        // car found
        this.message = '';
        this.patchForm(next);
        this.message = 'Tìm xe thành công';
        this.snackBar.open(this.message, 'OK', {
          duration: 1000
        });
        const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
        this.ticketService.findMemberCardsByCar(car).subscribe(next2 => {
          const memberCard = next2[next2.length - 1];
          this.memberCard = memberCard;
          // check valid member card
          this.invalidMemberCard = !this.checkMemberCardValid(memberCard.endDate);
        });
        // car not register parked
        if (next.parkingSlot != null && !next.parkingSlot.reserved) {
          const ticketList = next.parkingSlot.car.ticketList;
          const enterDateNew = this.datePipe.transform(ticketList[ticketList.length - 1].enterDate, 'yyyy-MM-ddTHH:mm');
          this.ticketForm.patchValue({enterDate: enterDateNew});
          this.ticketForm.patchValue({exitDate: currentDate});
          // calculate price
          const enterDate = new Date(this.ticketForm.value.enterDate).valueOf();
          const exitDate = new Date(this.ticketForm.value.exitDate).valueOf();
          const time = Math.ceil((exitDate - enterDate) / (1000 * 60 * 60));
          // get slot type to calculate price
          const slot = next.parkingSlot.slotType.slotName;
          const price = this.calculatePrice(slot, time);

          this.ticketForm.patchValue({price});
        } else if (next.parkingSlot != null && next.parkingSlot.reserved) {
          // car registered
          this.ticketService.findMemberCardsByCar(car).subscribe(next2 => {
            let memberCard = next2[next2.length - 1];
            this.memberCard = memberCard;
            let id = 0;
            if (typeof memberCard.car === 'object') {
              id = memberCard.car.id;
            } else {
              id = memberCard.car;
            }
            // check valid member card
            this.invalidMemberCard = !this.checkMemberCardValid(memberCard.endDate);
            this.ticketService.findSlotByCarId(id).subscribe(next3 => {
              const parkingSlot = next3;
              const memberCardList = parkingSlot.car.memberCardList;
              memberCard = memberCardList[memberCardList.length - 1];
              const entryLogList = memberCard.entryLogList;
              let enterDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
              // check if car is registered recently
              if (entryLogList.length > 0) {
                const entryLog = entryLogList[entryLogList.length - 1];
                enterDate = this.datePipe.transform(entryLog.enterDate, 'yyyy-MM-ddTHH:mm');
              }
              // car registered parked
              if (parkingSlot.status) {
                this.ticketForm.patchValue({enterDate});
                this.ticketForm.patchValue({exitDate: currentDate});
              } else {
                // car registered not parked
                this.ticketForm.patchValue({enterDate: currentDate});
                this.ticketForm.patchValue({exitDate: null});
              }
            });
          });
        } else {
          // car not parked
          this.ticketForm.patchValue({enterDate: currentDate});
          this.ticketForm.patchValue({exitDate: null});
          this.ticketForm.patchValue({price: null});
        }

      }
    }, error => {
      console.log(error);
    });
  }

  checkout() {
    const car2 = {
      plateNumber: this.ticketForm.value.plateNumber,
    };
    const endDate = this.ticketForm.value.endDate;
    const startDate = this.ticketForm.value.startDate;
    // find car before checkout
    this.ticketService.findCar(car2).subscribe(next2 => {
      if (next2.message === 'Không tìm thấy xe') {
        this.snackBar.open(next2.message, 'OK', {
          duration: 1000
        });
        return;
      } else {
        this.patchForm(next2);
        if (this.ticketForm.valid) {
          const ticket = {
            car: {
              carType: {
                carTypeName: this.ticketForm.value.carType
              },
              plateNumber: this.ticketForm.value.plateNumber,
            },
            price: this.ticketForm.value.price,
            enterDate: this.ticketForm.value.enterDate,
            exitDate: this.ticketForm.value.exitDate,
          };
          const isRegistered = startDate !== null;
          const isValid = this.checkMemberCardValid(endDate);
          // if car not registered or member card invalid
          if (!isRegistered || !isValid) {
            if (next2.parkingSlot == null) {
              this.snackBar.open('Xe không nằm trong bãi', 'OK', {
                duration: 1000
              });
              return;
            }
            if (this.ticketForm.value.price == null || this.ticketForm.value.price === '') {
              this.snackBar.open('Xe chưa tính phí', 'OK', {
                duration: 1000
              });
              this.ticketForm.reset();
              this.ticketForm.patchValue(car2);
              this.patchForm(next2);
              return;
            }
            this.ticketService.closeTicket(ticket).subscribe(next => {
              this.message = next.message;
              this.snackBar.open(this.message, 'OK', {
                duration: 1000
              });
              const parkingSlot = {
                floor: '',
                slot: '',
                price: '',
              };
              this.ticketForm.patchValue(parkingSlot);
            });
          } else {
            // if car registered
            const car = ticket.car;
            this.ticketService.checkoutRegisteredCar(car).subscribe(next => {
              this.message = next.message;
              this.snackBar.open(this.message, 'OK', {
                duration: 1000
              });
            });
          }
        } else {
          this.ticketForm.markAllAsTouched();
          this.focusFirstInvalid();
        }
      }
    });
  }

  compareType(c1, c2) {
    return c1 === c2;
  }

  calculatePrice(slot, time) {
    switch (slot) {
      case 'S':
        return time * 10000;
      case 'M':
        return time * 20000;
      default:
        return time * 30000;
    }
  }

  checkMemberCardValid(endDate) {
    const currentDate = (new Date()).valueOf();
    const endDate2 = (new Date(endDate)).valueOf();
    return currentDate - endDate2 < 0;
  }

  patchForm(next) {
    const ticket = {
      fullName: null,
      email: null,
      carType: next.carType.carTypeName,
      floor: null,
      slot: null,
      enterDate: null,
      startDate: null,
      endDate: null
    };
    if (next.parkingSlot) {
      ticket.floor = next.parkingSlot.floor;
      ticket.slot = next.parkingSlot.slotNumber;
    }
    if (next.customer) {
      ticket.fullName = next.customer.fullName;
      ticket.email = next.customer.email;
    }
    if (next.enterDate) {
      ticket.enterDate = next.enterDate;
    }
    if (next.memberCardList != null && next.memberCardList.length > 0) {
      const car = {
        plateNumber: this.ticketForm.value.plateNumber
      };
      this.ticketService.findMemberCardsByCar(car)
        .subscribe(next2 => {
          const memberCardList = next2;
          const memberCard = memberCardList[memberCardList.length - 1];
          ticket.startDate = this.datePipe.transform(new Date(memberCard.startDate), 'yyyy-MM-ddTHH:mm');
          ticket.endDate = this.datePipe.transform(new Date(memberCard.endDate), 'yyyy-MM-ddTHH:mm');
          ticket.enterDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
          this.ticketForm.patchValue(ticket);
        });
    }
    this.ticketForm.patchValue(ticket);
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {whitespace: true};
  }

  getCarInfo($event: any) {
    console.log($event);
    this.ticketForm.controls.plateNumber.setValue($event.plateNumber);
    console.log(this.plateNumberFromCamera);
    this.findCar();
  }

  reset() {
    this.ticketForm.controls.plateNumber.setValue('');
    this.ticketForm.reset();
  }

  extend() {
    console.log(this.ticketForm.value.slot);
    if (this.ticketForm.value.slot == null) {
      this.ticketService.arrangeSlotRegisterCar(this.ticketForm.value.plateNumber).subscribe(next => {
        this.extendDuration();
      });
    } else {
      this.extendDuration();
    }
  }

  extendDuration() {
    this.ticketService.extendDuration(this.memberCard.id).subscribe(next => {
      console.log(next);
      this.invalidMemberCard = false;
      this.findCar();
    });
  }
}
