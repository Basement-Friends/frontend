import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CstErrorStateMatcher } from 'src/app/classes/cst-error-state-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  matcher = new CstErrorStateMatcher()

  matchPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value
    let passwordRepeat = group.get('passwordRepeat')?.value
    return pass === passwordRepeat ? null : { notSame: true }
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$'), Validators.minLength(8)]),
    passwordRepeat: new FormControl('', [Validators.required]),
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

  get password() {
    return this.registerForm.get('password')
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat')
  }

  register(){
    
  }
}
