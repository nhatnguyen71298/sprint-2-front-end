import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
              private ticketService: TicketService,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      enterDate: [],
      exitDate: [],
      plateNumber: ['', [Validators.required, Validators.maxLength(10)]],
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
    this.ticketForm.value.plateNumber.trim();
    if (this.ticketForm.value.plateNumber.trim() === '') {
      this.snackBar.open('Vui lòng nhập biển số', 'OK', {
        duration: 1000
      });
      return;
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
      const isRegistered = this.ticketForm.value.startDate != null;
      console.log(this.ticketForm.value.startDate);
      const isValid = this.checkMemberCardValid(this.ticketForm.value.endDate);
      // if car not register or member card expired
      console.log(!isRegistered);
      console.log( !isValid);
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
            this.ticketService.findSlotByCarId(memberCard.car.id).subscribe(next3 => {
              const parkingSlot = next3;
              const memberCardList = parkingSlot.car.memberCardList;
              memberCard = memberCardList[memberCardList.length - 1];
              const entryLogList = memberCard.entryLogList;
              const entryLog = entryLogList[entryLogList.length - 1];
              const enterDate = this.datePipe.transform(entryLog.enterDate, 'yyyy-MM-ddTHH:mm');
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
    const endDate2 = new Date(endDate).valueOf();
    return currentDate - endDate2 < 0;
  }

  checkout() {
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
      const isRegistered = this.ticketForm.value.startDate != null;
      const isValid = this.checkMemberCardValid(this.ticketForm.value.endDate);
      // if car not registered
      if (!isRegistered || !isValid) {
        if (this.ticketForm.value.price == null) {
          this.snackBar.open('Vui lòng tính phí trước', 'OK', {
            duration: 1000
          });
          return;
        }
        if (!new RegExp('\\d+').test(this.ticketForm.value.price)) {
          this.snackBar.open('Tổng tiền phải là số', 'OK', {
            duration: 1000
          });
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
    }
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
          ticket.startDate = this.datePipe.transform(new Date(memberCard.startDate), 'dd-MM-yyyy');
          ticket.endDate = this.datePipe.transform(new Date(memberCard.endDate), 'dd-MM-yyyy');
          ticket.enterDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
          this.ticketForm.patchValue(ticket);
        });
    }
    this.ticketForm.patchValue(ticket);
  }
}
