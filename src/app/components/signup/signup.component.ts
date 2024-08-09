import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

// class CustomErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
//     return control?.value;
//   }

// }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // customError = new CustomErrorStateMatcher();
  signupForm: FormGroup;
  constructor(
    private fb:FormBuilder,
    private _authSer:AuthService ,
    private _router: Router ,
    private _toaster: MatSnackBar){
    this.signupForm = fb.group({
     name:['' , [Validators.required , Validators.minLength(3)]],
      phone:['' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required , Validators.pattern(/^[A-Z].{5,}/)]],
      rePassword:['' , [Validators.required , Validators.pattern(/^[A-Z].{5,}/)]],
    })
  }

  singup(){
   this._authSer.singup(this.signupForm.value).subscribe({
    next:(r)=> {
      if(r.message == 'success'){
        this._router.navigate(['/login'])
      } else {
        this._toaster.open('pls try again' , '' , {
          duration: 2000
        })
      }
    },
    error:(e)=> {

      console.log(e.error.message);
      
      this._toaster.open(e.error.message , '' , {
        duration: 2000
      })
    },
    complete:()=> console.log('finish')
   })
  }

  get name(){
    return this.signupForm.get('name')
  }
 
  get phone(){
    return this.signupForm.get('phone')
  }
  get password(){
    return this.signupForm.get('password')
  }
  get rePassword(){
    return this.signupForm.get('rePassword')
  }
  get email(){
    return this.signupForm.get('email')
  }

  get nameErrorMsg(){
    return this.name?.hasError('required') ?
      'this input is required' : 
      this.name?.hasError('minlength') ?
      'must be at least 3 ch' : 
      ''
  }
  get emailErrorMsg(){
    return this.email?.hasError('required') ?
      'this input is required' : 
      this.email?.hasError('email') ?
      'this email is not valid' : 
      ''
  }
  get passErrorMsg(){
    return this.password?.hasError('required') ?
      'this input is required' : 
      this.password?.hasError('pattern') ?
      'must be start with upperCase then  at least 5 char' : 
      ''
  }
  get rePassErrorMsg(){
    return this.rePassword?.hasError('required') ?
      'this input is required' : 
      this.rePassword?.hasError('pattern') ?
      'must be start with upperCase then  at least 5 char' : 
      ''
  }
  get phoneErrorMsg(){
    return this.phone?.hasError('required') ?
      'this input is required' : 
      this.phone?.hasError('pattern') ?
      'must be valid egyptian num' : 
      ''
  }
 
}
