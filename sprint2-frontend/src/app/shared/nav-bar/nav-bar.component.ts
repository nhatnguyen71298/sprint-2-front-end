import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../authentication/service/token-storage/token-storage.service';
import {AuthenticationService} from '../../authentication/service/auth/authentication.service';
import {User} from '../../authentication/model/User';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: string;
  user: User;
  check: boolean;

  constructor(public dialog: MatDialog,
              private router: Router,
              private token: TokenStorageService,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    if (this.token.getUser() != null) {
      this.authenticationService.findBy(this.token.getUser().username).subscribe(data => {
        console.log(data);
        this.user = data;
        if (this.user != null) {
          this.check = true;
        }
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.toastr.success('Đăng xuất', 'Toastr fun!');
    this.token.signOut();
    this.reloadPage();
  }

  login() {
    this.router.navigateByUrl('/home-page/login');
  }

  signIn() {
    this.router.navigateByUrl('/home-page/sign-up');
  }
}
