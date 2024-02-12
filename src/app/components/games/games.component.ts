import { Component, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnChanges{

  // @Input() user: User | null = null
  @Input() user: User | undefined

  possibleGames: Game[] = [
    {id: 0, name: "Sid Meier's Civilization V"},
    {id: 1, name: "Counter Strike: Global Offensive"},
    {id: 2, name: "League of Legends"},
    {id: 3, name: "Minecraft"},
  ]
  userGames: Game[] = []
  filteredOptions: Game[] = []
  selectedGame: Game | undefined
  gameDescription: string = ""
  
  @ViewChild('gameInput') gameInput!: ElementRef<HTMLInputElement>
  @ViewChild('description') description!: ElementRef<HTMLInputElement>
  gameControl = new FormControl('', [Validators.required])  
  descriptionControll = new FormControl('')  
  step: number = 0;  
  addingGame: boolean = false

  addedGame: EventEmitter<void> = new EventEmitter<void>()
  
  constructor(
    private gamesSrv: GamesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user'])
    {
      this.gamesSrv.getGames()
        .subscribe(games => this.possibleGames = [...this.possibleGames, ...games])
      if(this.user !== undefined)
        this.user.gameRecords.forEach(record => record.game !== undefined && this.userGames.push(record.game))
    }
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
    {
      this.userGames.push(this.selectedGame)
      this.gamesSrv.addGame(this.selectedGame)
    }
    this.selectedGame = undefined
    this.gameInput.nativeElement.value = ""
    this.addedGame.emit()
  }

  filterGames(){
    const filterValue = this.gameInput.nativeElement.value.toLowerCase()
    this.filteredOptions = this.possibleGames.filter( game => 
      game.name.toLowerCase().includes(filterValue)
    )
  }

  editDescription(){
    this.gameDescription = this.description.nativeElement.value
  }

  displayGame(game: Game) {
    return game && game.name ? game.name : ''
  }
}
