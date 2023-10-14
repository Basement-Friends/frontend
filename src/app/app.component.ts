import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'basement-friends';

  constructor(
    private router: Router
  ){}

  backHome(){
    this.router.navigateByUrl("/")
  }
}
