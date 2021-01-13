import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message-notice-member-card',
  templateUrl: './message-notice-member-card.component.html',
  styleUrls: ['./message-notice-member-card.component.css']
})
export class MessageNoticeMemberCardComponent implements OnInit {
  private message = 'Nothing';
  private path = '/employee/member-card-list';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.message = data.message;
      if (data.path !== undefined) {
        this.path = data.path;
      }
    });
  }

}
