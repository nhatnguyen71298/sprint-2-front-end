import {Component, OnInit} from '@angular/core';
import {MemberCardService} from '../../../service/member-card.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MemberCardCreateComponent} from '../member-card-create/member-card-create.component';
import {UpdateMemberCardDialogComponent} from "../update-member-card-dialog/update-member-card-dialog.component";
import {DeleteMemberCardDialogComponent} from "../delete-member-card-dialog/delete-member-card-dialog.component";
import {Router} from "@angular/router";

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

  constructor(
    private memberCardService: MemberCardService,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllMemberCard();
  }

  // Lanh start

  getAllMemberCard(): void {
    this.memberCardService.getMemberCardList().subscribe(data => {
      this.memberCardList = data;
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
        this.keywordSearch = this.keywordSearch.trim();
        this.memberCardService.searchPlateNumber(this.keywordSearch).subscribe(data => {
          this.memberCardList = data;
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

  // Lanh end

  // Hoat start

  openDialogEdit(id: any) {
    this.memberCardService.findMemberCardByIdService(id).subscribe(memberCard => {
        if (memberCard != null) {
          const DIALOG_REF = this.dialog.open(UpdateMemberCardDialogComponent, {
            width: '800px',
            height: '700px',
            data: {dataMemberCard: memberCard},
            disableClose: true
          });
          DIALOG_REF.afterClosed().subscribe(
            result => {
              this.ngOnInit();
            });
        } else {
          // const NOTICE = 'Không tìm thấy vé.';
          // const URL = 'http://localhost:4200/list-member-card';
          // this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
          // });
        }
      },
      () => {
        // this.error();
      }
    );
  }

  // private error() {
  //   const NOTICE = 'Lỗi hệ thống.';
  //   const URL = 'http://localhost:4200/list-member-card';
  //   this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
  //   });
  // }

  openDialogDelete(id: any): void {
    this.memberCardService.findMemberCardByIdService(id).subscribe(
      memberCard => {
        if (memberCard != null) {
          const DIALOG_REF = this.dialog.open(DeleteMemberCardDialogComponent, {
            width: '650px',
            height: '360px',
            data: {dataMemberCard: memberCard},
            disableClose: true
          });

          DIALOG_REF.afterClosed().subscribe(result => {
            this.ngOnInit();
          });
        } else {
          // const NOTICE = 'Không tìm thấy vé.';
          // const URL = 'http://localhost:4200/list-ticket';
          // this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
          // });
        }
      },
      () => {
        // this.error();
      }
    );
  }
}

