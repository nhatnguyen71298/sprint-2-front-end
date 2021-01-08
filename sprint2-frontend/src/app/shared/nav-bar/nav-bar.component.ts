import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../authentication/service/token-storage/token-storage.service";
import {AuthenticationService} from "../../authentication/service/auth/authentication.service";
import {User} from "../../authentication/model/User";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: string;
  user: User;
  constructor(public dialog: MatDialog,
              private token: TokenStorageService,
              private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
      this.authenticationService.findBy(this.token.getUser().username).subscribe( data => {
        this.user = data;
        console.log('data');
        console.log(data);
      });
  }
  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.token.signOut();
    this.reloadPage();
  }

}
