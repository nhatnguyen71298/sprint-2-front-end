import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    // public loginService: LoginService,
    public router: Router,
    // public spinnerOverlayService: SpinnerOverlayService,
    // private socialAuthService: AuthService,
    // public el: ElementRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
    });
  }

  loginFacebook() {
  }

  loginGoogle() {
  }

  onSubmit() {
  }


  reset() {
    this.ngOnInit();
  }
}
