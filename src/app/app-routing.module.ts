
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NotfoundComponent } from './404/not-found.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'file-upload',
    component : FileUploadComponent
  },
  {
    path : '404',
    component :NotfoundComponent
  },
  {
    path : '**',
    redirectTo : '404',
    pathMatch : 'full'
  },
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }