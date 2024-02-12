import { Component, OnInit, effect, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, first, map } from 'rxjs';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  loggedUser: User | null = null
  gamer: User | undefined
  isEditing: boolean = false

  currentUser = signal<User | null | undefined>(undefined)

  // matchPasswords: ValidatorFn = (group: AbstractControl) => {
  //   let oldPassword = group.get('oldPassword')?.value
  //   let newPassword = group.get('newPassword')?.value
  //   let newPasswordRepeat = group.get('newPasswordRepeat')?.value
  //   let savedPass = localStorage.getItem('password')
  //   return oldPassword === savedPass && newPassword === newPasswordRepeat ? null : { notSame: true }
  // }

  // get oldPassword() {
  //   return this.eidtedUserForm.get('oldPassword')
  // }

  // get newPassword() {
  //   return this.eidtedUserForm.get('newPassword')
  // }
  
  // get newPasswordRep(){
  //   return this.eidtedUserForm.get('newPasswordRepeat')    
  // }

//    effect(() => console.log("currentUser: ", this.currentUser()))
  constructor(
    private loginSrv: LoginService,
    private usersSrv: UsersService,
    private router: Router,
    
  ){ }

  ngOnInit(): void {
    this.usersSrv.getCurrentUserGamer()
    .pipe(first())
    .subscribe(gamer => this.gamer = gamer)

    this.loginSrv.loggedUser$.pipe(
      filter(currentUser => currentUser !== undefined),
      map(currentUser => {
        if(currentUser !== undefined && currentUser !== null)
        this.loggedUser = currentUser
    }))
    .subscribe()
    this.currentUser = this.loginSrv.loggedUser
  }

  toSwiping() {
    this.router.navigate(["swipesetting"])
  }

  logout() {
    this.loginSrv.logout()
    this.router.navigate(['/login'])
  }

  startEditing(){
    this.isEditing = true
  }
  stopEditing(){
    this.isEditing = false
  }
}
