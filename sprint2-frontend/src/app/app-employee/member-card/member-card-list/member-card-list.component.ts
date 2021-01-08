import {Component, OnInit} from '@angular/core';
import {MemberCardService} from '../../../service/member-card.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MemberCardCreateComponent} from '../member-card-create/member-card-create.component';

@Component({
  selector: 'app-member-card-list',
  templateUrl: './member-card-list.component.html',
  styleUrls: ['./member-card-list.component.css']
})
export class MemberCardListComponent implements OnInit {
  memberCardList = [];
  p: number;
  public keywordSearch: string;
  public checkList = 'true';

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
    this.keywordSearch = '';
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

  searchPlateNumber() {
    if (this.keywordSearch !== '') {
      if (this.keywordSearch.match('^([A-Z]|\\d){6,10}$')) {
        console.log(this.keywordSearch);
        this.keywordSearch = this.keywordSearch.trim();
        this.memberCardService.searchPlateNumber(this.keywordSearch).subscribe(data => {
          console.log(data);
          this.memberCardList = data;
          console.log(this.memberCardList);
          if (this.memberCardList.length === 0) {
            this.checkList = 'false';
          }
        });
      } else {
        alert('Biến số xe không tồn tại.');
        this.resetSearch();
      }
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm.');
    }
  }

  resetSearch() {
    this.keywordSearch = '';
    this.checkList = 'true';
    this.ngOnInit();
  }

  keyDownFunctionSearch(event) {
    if (event.keyCode === 13) {
      this.searchPlateNumber();
    }
  }
}

