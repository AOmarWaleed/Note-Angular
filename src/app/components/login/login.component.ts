import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private _authSer: AuthService,
    private _toaster:MatSnackBar,
    private _router:Router){
    this.loginForm = fb.group({
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required , Validators.pattern(/[A-Z].{5,}/)]],
    })
  }

  get emailFormController(){
    return this.loginForm.get('email');
  }
  get passwordFormController(){
    return this.loginForm.get('password');
  }

  get emailFormControllerErrorMsg(){
    return this.emailFormController?.hasError('required') ?
      'this input is required' :
      this.emailFormController?.hasError('email') ?
      'email is not valid' :
      ''
  }
  get passwordFormControllerErrorMsg(){
    return this.passwordFormController?.hasError('required') ?
      'this input is required' :
      this.passwordFormController?.hasError('pattern') ?
      'must be start with upper case then at least 5 chars' :
      ''
  }

  login(){
    this._authSer.login(this.loginForm.value).subscribe({
      next:(r)=> {
       if(r.message === 'success' ) {
        localStorage.setItem('token' , r.token);
        this._authSer.getUserData();
        this._router.navigate(['/'])
       }else {
        this._toaster.open(r.message , '' , {duration: 2000 , horizontalPosition:'left'})
       }
      }
      ,
      error:(e)=>this._toaster.open(e.error.message , '' , {duration: 2000 , horizontalPosition:'left'}),
     
    })
    
  }
}
