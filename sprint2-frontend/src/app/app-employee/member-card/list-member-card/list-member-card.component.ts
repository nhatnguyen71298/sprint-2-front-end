import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UpdateMemberCardDialogComponent} from '../update-member-card-dialog/update-member-card-dialog.component';
import {DeleteMemberCardDialogComponent} from '../delete-member-card-dialog/delete-member-card-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MemberCardService} from '../../../service/member-card.service';


@Component({
  selector: 'app-list-member-card',
  templateUrl: './list-member-card.component.html',
  styleUrls: ['./list-member-card.component.css']
})
export class ListMemberCardComponent implements OnInit {
  public listMemberCard;

  constructor(
    public memberCardService: MemberCardService,
    public dialog: MatDialog,
    public route: Router
  ) {
  }

  ngOnInit() {
    this.memberCardService.getAllMemberCard().subscribe(data => {
      this.listMemberCard = data;
    });
  }

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
          const NOTICE = 'Không tìm thấy vé.';
          const URL = 'http://localhost:4200/list-member-card';
          this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
          });
        }
      },
      () => {
        this.error();
      }
    );
  }

  private error() {
    const NOTICE = 'Lỗi hệ thống.';
    const URL = 'http://localhost:4200/list-member-card';
    this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
    });
  }

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
          const NOTICE = 'Không tìm thấy vé.';
          const URL = 'http://localhost:4200/list-ticket';
          this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
          });
        }
      },
      () => {
        this.error();
      }
    );
  }
}
