import {Component, DoCheck, OnInit} from '@angular/core';
import {QuanService} from '../../quan.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, DoCheck {
  currentUser;
  role = '';
  load = 0;

  constructor(public quanService: QuanService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser != null) {
      this.role = this.currentUser.role;
    }
  }

  ngOnInit(): void {
    this.quanService.name.subscribe(val => {
      this.currentUser = val;
    });
    console.log(this.role);
  }

  ngDoCheck() {
    if (this.currentUser != null && this.load === 0) {
      window.location.reload();
      this.load++;
    } else {
      this.load--;
    }

  }
}
