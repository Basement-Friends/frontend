import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss',
})
export class PasswordChangeComponent {
  matchPasswords: ValidatorFn =  (group: AbstractControl) => {
    let oldPassword = group.get('oldPassword')?.value
    let newPassword = group.get('newPassword')?.value
    let newPasswordRepeat = group.get('newPasswordRepeat')?.value
    let savedPass = localStorage.getItem('password')
    return oldPassword === savedPass && newPassword === newPasswordRepeat ? null : { notSame: true }
  }

  @Output() stoppedEditing: EventEmitter<void> = new EventEmitter<void>()

  eidtedUserForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$'), Validators.minLength(8)]),
    newPasswordRepeat: new FormControl('', [Validators.required])
  },
  {
    validators: this.matchPasswords
  })

  get oldPassword() {
    return this.eidtedUserForm.get('oldPassword')
  }

  get newPassword() {
    return this.eidtedUserForm.get('newPassword')
  }
  
  get newPasswordRep(){
    return this.eidtedUserForm.get('newPasswordRepeat')    
  }

  changePassword(){

  }

  stopEditing() {
    this.stoppedEditing.emit()
  }
}
