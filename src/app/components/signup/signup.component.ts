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
      first_name:['' , [Validators.required , Validators.minLength(3)]],
      last_name:['' , [Validators.required , Validators.minLength(3)]],
      age:['' , [Validators.required , Validators.min(20)]],
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required , Validators.minLength(3)]],
    })
  }

  singup(){
   this._authSer.singup(this.signupForm.value).subscribe({
    next:(r)=> {
      if(r.message == 'success'){
        this._router.navigate(['/login'])
      } else {
        this._toaster.open(r.errors.email.message , '' , {
          duration: 2000
        })
      }
    },
    error:(e)=> console.log(e),
    complete:()=> console.log('finish')
   })
  }

  get firstNamecontroller(){
    return this.signupForm.get('first_name')
  }
  get lastNamecontroller(){
    return this.signupForm.get('last_name')
  }
  get agecontroller(){
    return this.signupForm.get('age')
  }
  get passwordcontroller(){
    return this.signupForm.get('password')
  }
  get emailcontroller(){
    return this.signupForm.get('email')
  }

  get firstNamecontrollerErrorMsg(){
    return this.firstNamecontroller?.hasError('required') ?
      'this input is required' : 
      this.firstNamecontroller?.hasError('minlength') ?
      'must be atleast 3 ch' : 
      ''
  }
  get emailcontrollerErrorMsg(){
    return this.emailcontroller?.hasError('required') ?
      'this input is required' : 
      this.emailcontroller?.hasError('email') ?
      'this email is not valid' : 
      ''
  }
  get passwordcontrollerErrorMsg(){
    return this.passwordcontroller?.hasError('required') ?
      'this input is required' : 
      this.passwordcontroller?.hasError('minlength') ?
      'must be atleast 3 ch' : 
      ''
  }
  get agecontrollerErrorMsg(){
    return this.agecontroller?.hasError('required') ?
      'this input is required' : 
      this.agecontroller?.hasError('min') ?
      'must be atleast 20' : 
      ''
  }
  get lastNamecontrollerErrorMsg(){
    return this.lastNamecontroller?.hasError('required') ?
      'this input is required' : 
      this.lastNamecontroller?.hasError('minlength') ?
      'must be atleast 3 ch' : 
      ''
  }
}
