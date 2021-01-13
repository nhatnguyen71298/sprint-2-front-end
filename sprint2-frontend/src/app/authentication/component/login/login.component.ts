import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {User} from '../../model/User';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {TokenDTO} from '../../model/TokenDTO';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {ToastrService} from 'ngx-toastr';
import {HomePageComponent} from '../home-page/home-page.component';
import {QuanService} from '../../../quan.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  errorMessage = '';
  socialUser: SocialUser;
  user: User;
  messageError = '';
  public idUser: number;
  userquan;

  constructor(
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private  title: Title,
    private authService: SocialAuthService,
    private formBuilder: FormBuilder,
    private quanService: QuanService) {
    this.title.setTitle('home-page');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{3,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9A-Z]{6,30}$/)]]
    });
  }

  onSubmit() {
    this.userquan = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    if (this.loginForm.valid) {
      console.log(this.userquan);
      this.quanService.authenticate(this.userquan).subscribe(
        data => {
          console.log(data);
          this.quanService.broadcastLoginChange(this.userquan);
        },
        err => {
          this.quanService.logout();
          this.errorMessage = 'Tên tài khoản và mật khẩu không hợp lệ !';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
          this.isLoggedIn = false;
          console.log(this.isLoggedIn);
          this.toastrService.success('Đăng nhập không thành công! Tên tài khoản và mật khẩu không hợp lệ !', 'Thông báo!');
        }, () => {
          this.toastrService.success('Đăng nhập thành công!', 'Thông báo!');
          this.router.navigateByUrl('/home-page/info');
          setTimeout(() => {
            this.reloadPage();
          }, 1000);
        }
      );
    } else {
      // this.messageError = 'Đăng nhập không thành công , Vui lòng nhập đúng thông tin.';
      this.toastrService.success('Đăng nhập không  thành công!', 'Thông báo!');
      setTimeout (() => {
        this.messageError = null;
      }, 3000);
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const token = new TokenDTO(this.socialUser.idToken);
        this.authenticationService.google(token).subscribe(next => {
          this.tokenStorageService.saveToken(next.accessToken);
          this.tokenStorageService.saveUser(next);
          this.toastrService.success('Đăng nhập thành công!', 'Thông báo!');
          this.isLoggedIn = true;
        }, err => {
          this.isLoggedIn = false;
        }, () => {
          this.router.navigateByUrl('/home-page');
          setTimeout(() => {
            this.reloadPage();
          }, 1000);
        });
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const token = new TokenDTO(this.socialUser.authToken);
        console.log(data);
        this.authenticationService.facebook(token).subscribe(next => {
          this.tokenStorageService.saveToken(next.accessToken);
          this.tokenStorageService.saveUser(next);
          //   console.log(next);
          this.isLoggedIn = true;
        }, err => {
          console.log('error');
          this.isLoggedIn = false;
        }, () => {
          this.toastrService.success('Đăng nhập thành công!', 'Thông báo!');
          this.router.navigateByUrl('/home-page/info');
          setTimeout(() => {
            this.reloadPage();
          }, 1000);
        });
      }
    );
  }

  reset(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  resetInput() {
    this.ngOnInit();
  }
  reloadPage(): void {
    window.location.reload();
  }
}
