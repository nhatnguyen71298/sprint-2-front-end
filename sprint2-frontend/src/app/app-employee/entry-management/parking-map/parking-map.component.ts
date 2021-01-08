import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../service/ticket.service';

@Component({
  selector: 'app-parking-map',
  templateUrl: './parking-map.component.html',
  styleUrls: ['./parking-map.component.css']
})
export class ParkingMapComponent implements OnInit {
  parkingSlotList;
  floorList;
  currentFloor;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.ticketService.findAllFloor().subscribe(next => {
      this.floorList = next;
    });

    this.findAllSlotByFloor(1);
  }

  getSlotInfo(id) {
    this.ticketService.findSlotById(id).subscribe(next => {
      console.log(next);
    });
  }

  findAllSlotByFloor(floor) {
    this.ticketService.findAllSlotByFloor(floor).subscribe(next => {
        this.parkingSlotList = next;
        this.currentFloor = floor;
      }
    );
  }
}
