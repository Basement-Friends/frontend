import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CstErrorStateMatcher } from 'src/app/classes/cst-error-state-matcher';
import { RegisterData } from 'src/app/classes/register-data';
import { User } from 'src/app/classes/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(
    private registerService: RegisterService
  ) {}

  matcher = new CstErrorStateMatcher()


  matchPasswords: ValidatorFn = (group: AbstractControl) => {
    let pass = group.get('password')?.value
    let passwordRepeat = group.get('passwordRepeat')?.value
    return pass === passwordRepeat ? null : { notSame: true }
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required,]),
    lastName: new FormControl('', [Validators.required,]),
    nickName: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$'), Validators.minLength(8)]),
    passwordRepeat: new FormControl(''),
  },
  {
    validators: this.matchPasswords
  })


  get email() {
    return this.registerForm.get('email')
  }

  get name() {
    return this.registerForm.get('name')
  }
  
  get lastName(){
    return this.registerForm.get('lastName')    
  }

  get nickName() {
    return this.registerForm.get('nickName')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat')
  }

  register(){
    let newUserData = new RegisterData()
    newUserData.email = this.email?.value
    newUserData.firstName = this.name?.value
    newUserData.lastName = this.lastName?.value
    newUserData.username = this.nickName?.value
    newUserData.password = this.password?.value
    this.registerService.register(newUserData)
  }
}
