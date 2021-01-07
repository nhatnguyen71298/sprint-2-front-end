import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketService} from '../../../service/ticket.service';

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
              private ticketService: TicketService
  ) {
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      enterDate: [],
      exitDate: [],
      plateNumber: ['', Validators.required],
      price: [],
      fullName: [],
      email: [],
      carType: ['', Validators.required],
      floor: [],
      slot: [],
      beginDate: [],
      endDate: []
    });
    this.ticketService.findAllCarType().subscribe(next => {
      this.carTypes = next;
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const ticket = {
        enterDate: this.ticketForm.value.enterDate,
        exitDate: this.ticketForm.value.exitDate,
        car: {
          plateNumber: this.ticketForm.value.plateNumber,
          carType: {
            carTypeName: this.ticketForm.value.carType,
          }
        }
      };
      this.ticketService.saveTicket(ticket).subscribe(next => {
        this.message = next.message;
        if (this.message === 'Xếp chỗ thành công') {
          const car = {
            plateNumber: this.ticketForm.value.plateNumber,
          };
          this.ticketService.findCar(car).subscribe(next2 => {
            this.patchForm(next2);
          });
        }
      });
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
        this.ticketForm.reset();
        this.ticketForm.patchValue({plateNumber: car.plateNumber});
      } else {
        // car found
        this.message = '';
        this.patchForm(next);
        this.message = 'Tìm xe thành công';
      }
    }, error => {
      console.log(error);
    });
  }

  compareType(c1, c2) {
    return c1 === c2;
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
      this.ticketService.closeTicket(ticket).subscribe(next => {
        this.message = next.message;
        const parkingSlot = {
          floor: '',
          slot: ''
        };
        this.ticketForm.patchValue(parkingSlot);
      });
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }

  patchForm(next) {
    const ticket = {
      fullName: null,
      email: null,
      carType: next.carType.carTypeName,
      floor: null, slot: null
    };
    if (next.parkingSlot) {
      ticket.floor = next.parkingSlot.floor;
      ticket.slot = next.parkingSlot.slotNumber;
    }
    if (next.customer) {
      ticket.fullName = next.customer.fullName;
      ticket.email = next.customer.email;
    }
    this.ticketForm.patchValue(ticket);
  }
}
