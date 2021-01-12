import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {ToastrService} from 'ngx-toastr';

function comparePassword(c: AbstractControl): any {
  const v = c.value;
  const isNotEmpty = v.confirmPassword !== '';
  if (isNotEmpty) {
    return (v.passwordNew === v.confirmPassword) ? null : {
      passwordNotMatch: true
    };
  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  checkRegister: any;
  messageError = '';

  constructor(
    private toastrService: ToastrService,
    public formBuilder: FormBuilder,
    // public loginService: LoginService,
    private authenticationService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{3,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      passwordNew: ['', [Validators.required, Validators.pattern(/^[a-z0-9A-Z]{6,30}$/)]],
      confirmPassword: ['', [Validators.required]],
    }, {validator: comparePassword});
  }

  onSubmit() {
    if (this.signUpForm.valid){
      this.authenticationService.register(this.signUpForm.value.username, this.signUpForm.value.passwordNew ).subscribe( next => {
        console.log(next);
        this.checkRegister = next;
        if (this.checkRegister === 3){
          this.toastrService.success('Đăng ký tài khoản thành công!', 'Thông báo!');
          this.router.navigateByUrl('/home-page/info');
        }else if (this.checkRegister === 2) {
          this.toastrService.success('Tên tài khoản chưa được kích hoạt. Vui lòng nhập tên khác.', 'Thông báo!');
          setTimeout(() => {
            this.messageError = '';
          }, 2000);
        } else if (this.checkRegister === 1) {
          this.toastrService.success('Tên tài khoản đã được đăng ký. Vui lòng nhập tên khác.', 'Thông báo!');
        }
      });
    } else {
      // this.messageError = 'Bạn đang để trống hoặc sai thông tin , vui lòng điền đầy đủ thông tin!';
      this.toastrService.success('Bạn đang để trống hoặc sai thông tin , vui lòng điền đầy đủ thông tin!', 'Thông báo!');
      setTimeout(() => {
        this.messageError = '';
      }, 2000);
    }
  }
}
