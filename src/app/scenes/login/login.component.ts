import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserData } from 'src/app/classes/user-data';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private loginSrv: LoginService
  ){}

  applyForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  logIn(){    
    let user = new UserData(this.applyForm.value.username,
      this.applyForm.value.password)

      console.log("logging in as:\n", this.applyForm.value.username);
      this.loginSrv.login(user)
    }

}
