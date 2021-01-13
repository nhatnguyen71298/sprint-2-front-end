import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangePasswordSuccessfullyComponent} from '../change-password-successfully/change-password-successfully.component';
import {ChangePasswordService} from '../../../service/nqkhanh/change-password.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  public savePassWordForm: FormGroup;
  public account;
  public messageFalse: string;

  constructor(public dialogRef: MatDialogRef<ConfirmEmailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public changePasswordService: ChangePasswordService,
              public formBuilder: FormBuilder, public router: Router, public dialog: MatDialog, private el: ElementRef) {
    this.savePassWordForm = this.formBuilder.group({
      verificationCode: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  savePassword() {
    this.changePasswordService.findAppAccountById(1).subscribe(dataSavePassword => {
        this.account = {
          verificationCode: this.savePassWordForm.controls.verificationCode.value,
          passwordNew: this.data.dataAccount
        };
        console.log(this.account);
        this.changePasswordService.confirmVerifyCode(dataSavePassword.id, this.account).subscribe(dataConfirm => {
          if (dataConfirm) {
            this.changePasswordService.savePassword(dataSavePassword.id, this.account).subscribe(dataChange => {
              if (this.savePassWordForm.valid) {
                this.dialog.open(ChangePasswordSuccessfullyComponent, {
                  width: '690px',
                  height: '200px',
                  position: {
                    top: '200px'
                  },
                  disableClose: true
                });
              }
              this.dialogRef.close();
            });
          } else {
            for (const KEY of Object.keys(this.savePassWordForm.controls)) {
              if (this.savePassWordForm.controls[KEY].invalid) {
                const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
                INVALID_CONTROL.focus();
                break;
              }
            }
            if (this.savePassWordForm.controls.verificationCode.value === '') {
              this.messageFalse = 'Vui long nhập mã xác nhận';
            }else {
              this.messageFalse = 'Mã xác nhận chưa chính xác, vui lòng nhập lại!';
            }
          }
        });
      }
    );
  }
}
