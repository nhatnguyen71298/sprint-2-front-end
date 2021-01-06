import {Component, OnInit} from '@angular/core';
import {MemberCardService} from '../../../service/member-card.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MemberCardCreateComponent} from "../member-card-create/member-card-create.component";

@Component({
  selector: 'app-member-card-list',
  templateUrl: './member-card-list.component.html',
  styleUrls: ['./member-card-list.component.css']
})
export class MemberCardListComponent implements OnInit {
  memberCardList: any[];
  p: number;

  constructor(private memberCardService: MemberCardService,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllMemberCard();
  }

  getAllMemberCard(): void {
    this.memberCardService.getMemberCardList().subscribe(data => {
      this.memberCardList = data;
      console.log(data);
    });
  }

  openAddNew() {
    const dialogRef = this.dialog.open(MemberCardCreateComponent, {
      width: '850px',
      height: '550px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
