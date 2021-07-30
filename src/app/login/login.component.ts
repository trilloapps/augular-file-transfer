import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form: FormGroup = Object.create(null);
  msg: string = '';
  mode:boolean;
  constructor(
    private routes: Router,
    private fb: FormBuilder,
    private authService:AuthService
  ) {}

  loginform = false;
  recoverform = false;
  loginSpinner = false;

  ngOnInit() {
    this.mode=false;
    this.form = this.fb.group({
      username: [null, Validators.compose([
        Validators.required] )],
      password: [null, Validators.compose([Validators.required])],
      // tenant: [null, Validators.compose([
      //   Validators.required] )],

    });
  }
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

 
 

  onSubmit () {
  
    let body = 
    {
      j_username:this.form.controls['username'].value,
      j_password:this.form.controls['password'].value,
      // tenant_display_name:this.form.controls['tenant'].value,

    }
    if(!this.form.valid)
    {
       return 0;
    }
  //  else if (body.tenant_display_name == "trillo") {
   else {
    this.loginSpinner = true;
    this.authService.AuthService_Login(JSON.stringify(body)).subscribe(
      data => {
        console.log("Login data : ", data)
        let accessToken = data.accessToken;
        let userRole = data.user.role;
        let tanantName = data.user.tenantName;
        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("username",this.form.controls['username'].value);
        localStorage.setItem("tenant",tanantName);
        localStorage.setItem("userRole",userRole);
        this.loginSpinner = false;
        this.routes.navigate(['/file-upload']);
      },
      err => {
        localStorage.removeItem("accessToken");
        this.msg = err.error.message;
        this.loginSpinner = false;

      }
    );
   }
  //   else {
  //    alert("Tanent not supported")
     
  //  }
  }

  showPass(){
    this.mode = !this.mode
  }
}
