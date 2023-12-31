import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-swipe-settings',
  templateUrl: './swipe-settings.component.html',
  styleUrls: ['./swipe-settings.component.scss'],
})
export class SwipeSettingsComponent implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  
  
  games: Game[] = []
  private _selectedGames: Array<Game> = new Array<Game>(0)
  get selectedGames(): Array<Game> {
    return this._selectedGames
  }
  set selectedGames(games: Array<Game>){
    this._selectedGames = games
  }

  filteredOptions: Game[] = []

  selectedGender: Gender | null = null
  genders: string[] = Object.values(Gender);

  searchSettingsForm: FormGroup = new FormGroup({
    gender: new FormControl(null),
    games: new FormArray([])
  })
  get gameForms() {
    return this.searchSettingsForm.get('games') as FormArray
  }

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService
  ){}
  
  ngOnInit() {
    this.gamesService.getGames().subscribe( games => {
      this.games.push(...games)
    })
    this.searchSettingsForm.valueChanges.subscribe(this.updateSettings)
  }

  updateSettings(e: any) {
    this.selectedGender = e.gender
    if(e.game !== null)
      this._selectedGames.push(e.game)
  }

  addGame(game: Game) {
    const _game = this.fb.group({
      id: game.id,
      name: game.name
    })
    console.log(this.gameForms)
    let gf = this.gameForms
    this.gameForms?.push(_game)
    this.selectedGames.push(game)
  }

  deleteGame(i: number) {
    this.gameForms.removeAt(i)
  }

  displayGame(game: Game) {
    return game && game.name ? game.name : ''
  }

  startSwiping() {
    this.userService.getUsers()
    if(this.selectedGames?.length === 0) {
      alert("Please select game(s)!")
      return
    }
    this.router.navigate(["/swiping"])
  }

  filter() {
    const filterValue: string = this.input.nativeElement.value.toLowerCase()
    this.filteredOptions = this.games.filter(game => game.name.toLowerCase().includes(filterValue))
  }

  selected(e: Game) {
    this.addGame(e)
  }
}
