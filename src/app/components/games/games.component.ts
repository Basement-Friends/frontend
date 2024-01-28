import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
//@Input()
  games: Game[] = [
   {id: 0, name: "Europa Universalis IV"},
   {id: 1, name: "Sid Meier's Civilization V"},
  ]
  filteredOptions: Game[] = []
  selectedGame: Game | undefined

  @ViewChild('gameInput') gameInput!: ElementRef<HTMLInputElement>

  gameControl = new FormControl('', [Validators.required])
 
  step: number = 0;

  addingGame: boolean = false

  removeGame(id: number) {
    this.games = this.games.filter(item => item.id !== id)
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
    this.games.push(this.selectedGame)
    this.selectedGame = undefined
  }

  filterGames(){
    const filterValue = this.gameInput.nativeElement.value.toLowerCase()
    this.filteredOptions = this.games.filter( game => game.name.toLowerCase().includes(filterValue))
  }

  displayGame(game: Game) {
    return game && game.name ? game.name : ''
  }
}
