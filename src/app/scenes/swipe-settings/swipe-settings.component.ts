import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-swipe-settings',
  templateUrl: './swipe-settings.component.html',
  styleUrls: ['./swipe-settings.component.scss'],
})
export class SwipeSettingsComponent implements OnInit {
  
  
  games: Game[] = []
  
  settingsControll: FormGroup = new FormGroup({
    gamesControll: new FormControl(''),
  })

  constructor(
    private gamesService: GamesService,
    private router: Router
  ){}
  
  ngOnInit() {
    this.gamesService.getGames().subscribe( games => {
      this.games.push(...games)
      console.log(this.games);
    })
  }
  
  startSwiping() {
    this.router.navigate(["/swiping"])
  }

}
