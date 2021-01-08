import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [{
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('375466110415778'),
      },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('103585693874-0bjkl21cmmjf8d9n09io95ciuveiievl.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  }]
})
export class AuthenticationModule { }


