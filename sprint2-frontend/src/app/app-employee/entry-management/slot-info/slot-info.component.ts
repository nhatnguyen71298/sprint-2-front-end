import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TicketService} from '../../../service/ticket.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slot-info',
  templateUrl: './slot-info.component.html',
  styleUrls: ['./slot-info.component.css']
})
export class SlotInfoComponent implements OnInit {
  slotInfoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SlotInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private ticketService: TicketService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe, private route: Router) {
  }

  ngOnInit(): void {
    this.slotInfoForm = this.formBuilder.group({
      id: [''],
      floor: [''],
      slotNumber: [''],
      status: [''],
      reserved: [''],
      plateNumber: [''],
      carType: [''],
      enterDate: [''],
    });
    this.ticketService.findSlotById(this.data.id).subscribe(next => {
      console.log(next);
      // empty slot
      if (next.car == null) {
        this.slotInfoForm.patchValue(next);
      } else {
        let enterDate;
        // get date from ticket if not register
        if (!next.reserved) {
          const ticketList = next.car.ticketList;
          const ticket = ticketList[ticketList.length - 1];
          enterDate = this.datePipe.transform(ticket.enterDate, 'yyyy-MM-ddThh:mm');
        } else if (next.status) {
          // get date from entry log
          const memberCardList = next.car.memberCardList;
          const ticket = memberCardList[memberCardList.length - 1];
          const entryLogList = ticket.entryLogList;
          const entryLog = entryLogList[entryLogList.length - 1];
          enterDate = entryLog.enterDate;
        }
        const slot = {
          id : next.id,
          floor: next.floor,
          slotNumber: next.slotNumber,
          status: next.status,
          reserved: next.reserved,
          plateNumber: next.car.plateNumber,
          carType: next.car.carType.carTypeName,
          enterDate
        };
        this.slotInfoForm.patchValue(slot);
      }
    });
  }

  getId(id: any) {
    console.log(id);
    this.route.navigate(['app-member-card-create', {message: id}]).then(r => {
    });
  }
}
