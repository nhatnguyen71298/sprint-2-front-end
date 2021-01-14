import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../service/ticket.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SlotInfoComponent} from '../slot-info/slot-info.component';

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

  constructor(private ticketService: TicketService,
              public dialog: MatDialog, public dialogRef: MatDialogRef<OpenParkingMapComponent>) {
  }

  ngOnInit(): void {
    this.ticketService.findAllFloor().subscribe(next => {
      this.floorList = next;
    });

    this.findAllSlotByFloor(1);
  }

  getSlotInfo(id) {
    const dialogRef = this.dialog.open(SlotInfoComponent, {
      width: '500px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The slot-info was closed');
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
    this.dialogRef.close();
  }
}

