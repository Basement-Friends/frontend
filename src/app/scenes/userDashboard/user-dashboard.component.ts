import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  loggedUser: User | null = null


  constructor(
    private loginSrv: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginSrv.loggedUser$.pipe(
      filter(currentUser => currentUser !== undefined),
      map(currentUser => {
        console.log(currentUser)
        if(currentUser !== undefined && currentUser !== null)
          this.loggedUser = currentUser
      })
    ).subscribe()
  }

  toSwiping() {
    this.router.navigate(["swipesetting"])
  }

}
