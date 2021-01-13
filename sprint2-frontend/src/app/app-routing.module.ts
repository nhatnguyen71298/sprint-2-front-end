import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import {ToastrModule} from 'ngx-toastr';


export const routes: Routes = [
  // {path: '', component: HomeComponent},

  // {path: 'authen', component: LoginComponent},
  // {path: 'sign-up', component: SignUpComponent},

  // {path: 'app-employee-list', component: EmployeeListComponent},
  // {path: '**', component: PageNotFoundComponent},
  // {
  //   path: '**',
  //   redirectTo: '404'
  // }
];
@NgModule({
  declarations: [NavBarComponent, FooterComponent, SideBarComponent,
    // LoginComponent, SignUpComponent, PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    } )
  ],
  exports: [RouterModule, NavBarComponent, FooterComponent, SideBarComponent]
})
export class AppRoutingModule { }
