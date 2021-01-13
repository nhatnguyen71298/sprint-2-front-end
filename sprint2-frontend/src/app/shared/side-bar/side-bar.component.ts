import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {QuanService} from '../../quan.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  currentUser;
  role = '';
  load = 'false';

  constructor(public quanService: QuanService,
              public activedRouter: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.quanService.broadcastLoginChange(this.currentUser);
    if (this.currentUser != null) {
      this.role = this.currentUser.role;
    }
  }

  ngOnInit(): void {
    if (this.load) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

}
