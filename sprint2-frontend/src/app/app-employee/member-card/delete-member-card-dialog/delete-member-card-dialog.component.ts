import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MemberCardService} from '../../../service/member-card.service';
import {Router} from '@angular/router';
import {MemberCard} from '../../../model/memberCard';

@Component({
  selector: 'app-delete-member-card-dialog',
  templateUrl: './delete-member-card-dialog.component.html',
  styleUrls: ['./delete-member-card-dialog.component.css']
})
export class DeleteMemberCardDialogComponent implements OnInit {

  public memberCar;
  protected idDelete: number;
  constructor(
    public dialogRef: MatDialogRef<DeleteMemberCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public memberCardService: MemberCardService,
    public route: Router
  ) { }

  ngOnInit() {
    this.memberCar = this.data.dataMemberCard;
    this.idDelete = this.data.dataMemberCard.id;
  }

  delete() {
    this.memberCardService.deleteMemberCardService(this.idDelete).subscribe(
      data => {
        console.log(data.message);
        if (data.message === 'Succeed') {
          this.dialogRef.close();
        } else {
          // this.dialogRef.close();
          // const NOTICE = 'Xóa vé không thành công';
          // const URL = 'http://localhost:4200/list-ticket';
          // this.route.navigate(['notice-page', {message: NOTICE, path: URL}]).then(r => {
          // });
        }
      },
      () => {
        // const NOTICE = 'Lỗi hệ thống';
        // this.route.navigate(['notice-page', {message: NOTICE}]).then(r => {
        // });
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
