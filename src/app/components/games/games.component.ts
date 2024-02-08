import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnInit{

  possibleGames: Game[] = []
  userGames: Game[] = []
  filteredOptions: Game[] = []
  selectedGame: Game | undefined
  
  @ViewChild('gameInput') gameInput!: ElementRef<HTMLInputElement>
  gameControl = new FormControl('', [Validators.required])  
  step: number = 0;  
  addingGame: boolean = false
  
  constructor(
    private gamesSrv: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesSrv.getGames()
    .subscribe(games => this.possibleGames = games)
  }

  removeGame(id: number) {
    this.userGames = this.userGames.filter(item => item.id !== id)
  }

  addGame(){
    this.addingGame = true
  }

  selectGame(game?: Game) {
    if(game === undefined || game === null)
      return
    this.selectedGame = game
  }

  confirmNewGame(){
    if(this.selectedGame === undefined || this.selectedGame === null)
      return
    this.addingGame = false
    if(!this.userGames.some(game => this.selectedGame?.name === game.name))
      this.userGames.push(this.selectedGame)
    this.selectedGame = undefined
    this.gameInput.nativeElement.value = ""
  }

  filterGames(){
    const filterValue = this.gameInput.nativeElement.value.toLowerCase()
    this.filteredOptions = this.possibleGames.filter( game => 
      game.name.toLowerCase().includes(filterValue)
    )
  }

  displayGame(game: Game) {
    return game && game.name ? game.name : ''
  }
}
