import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotfoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationRoutes } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
  ]
})
export class AuthenticationModule {}
