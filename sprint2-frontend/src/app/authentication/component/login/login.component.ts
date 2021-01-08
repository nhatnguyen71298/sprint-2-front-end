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

  constructor(
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private  title: Title,
    private authService: SocialAuthService,
    private formBuilder: FormBuilder) {
    this.title.setTitle('home-page');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9A-Z]{6,30}$/)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authenticationService.login(this.loginForm.value).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.token);
          this.tokenStorageService.saveUser(data);
          console.log(data);
          this.isLoggedIn = true;
        },
        err => {
          this.errorMessage = 'Tên tài khoản và mật khẩu không hợp lệ !';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
          this.isLoggedIn = false;
        }, () => {
          this.router.navigateByUrl('/home-page');
        }
      );
    } else {
      this.messageError = 'Đăng nhập không thành công , Vui lòng nhập đúng thông tin.';
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
          this.isLoggedIn = true;
        }, err => {
          this.isLoggedIn = false;
        }, () => {
          this.router.navigateByUrl('/home-page');
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
          this.router.navigateByUrl('/home-page');
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
}
