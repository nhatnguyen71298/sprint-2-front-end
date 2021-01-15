import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from '../../../service/ticket.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SlotInfoComponent} from '../slot-info/slot-info.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-open-parking-map',
  templateUrl: './open-parking-map.component.html',
  styleUrls: ['./open-parking-map.component.css']
})
export class OpenParkingMapComponent implements OnInit {
  parkingSlotList;
  floorList = [];
  currentFloor;
  availableSlots;
  id: number;

  constructor(private ticketService: TicketService,
              public dialog: MatDialog, public dialogRef: MatDialogRef<OpenParkingMapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.ticketService.findAllFloor().subscribe(next => {
      this.floorList = next;
    });

    this.findAllSlotByFloor(1);
  }

  getSlotInfo(idSlot) {
    this.ticketService.findSlotById(idSlot).subscribe(data => {
      if (data.status || data.reserved) {
        this.toastrService.error('Vị trí này đã có người đỗ hoặc người đăng ký thẻ', 'Thông báo');
      } else {
        const dialogRef = this.dialog.open(SlotInfoComponent, {
          width: '500px',
          data: {id: idSlot}
        });
        dialogRef.beforeClosed().subscribe(() => {
          if (dialogRef.componentInstance.data.id !== 0){
            this.id = dialogRef.componentInstance.data.id;
          }
        });

      }
    });
  }

  findAllSlotByFloor(floor) {
    this.ticketService.findAllSlotByFloor(floor).subscribe(next => {
        this.parkingSlotList = next;
        this.currentFloor = floor;
      }
    );
    this.ticketService.findAllAvailableSlots(floor).subscribe(next => {
      this.availableSlots = next.length;
    });
  }

  onNoClick(): void {
    this.data.id = this.id;
    this.dialogRef.close();
  }
}

