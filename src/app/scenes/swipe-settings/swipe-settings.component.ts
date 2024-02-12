import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender';
import { Game } from 'src/app/interfaces/game';
import { SearchContainerService } from 'src/app/services/search-container.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-swipe-settings',
  templateUrl: './swipe-settings.component.html',
  styleUrls: ['./swipe-settings.component.scss'],
})
export class SwipeSettingsComponent implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  
  
  games: Game[] = [
    {id: 0, name: "Europa Universalis IV"},
    {id: 1, name: "Sid Meier's Civilization V"},
    {id: 2, name: "Counter Strike: Global Offensive"},
  ]
  private _selectedGames: Game[] = []
  
  filteredOptions: Game[] = []
  
  _selectedGender: Gender | null = null
  genders: string[] = Object.values(Gender);
  
  searchSettingsForm: FormGroup = new FormGroup({
    gender: new FormControl(null),
    games: new FormArray([])
  })
  get gameForm() {
    return this.searchSettingsForm.get('games') as FormArray
  }

  get selectedGender(){
    return this.searchSettingsForm.get('gender')?.value
  }
  set selectedGender(gender: Gender | null){
    this._selectedGender = gender
  }
  
  constructor(
    private gamesService: SearchContainerService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService,
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
    this.gameForm?.push(_game)
    this.selectedGames.push(game)
  }
  
  deleteGame(i: number) {
    this.gameForm.removeAt(i)
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
    this.gamesService.selectedGender = this.selectedGender
    this.gamesService.selectedGames = this.selectedGames
    this.router.navigate(["/swiping"])
  }
  
  filter() {
    const filterValue: string = this.input.nativeElement.value.toLowerCase()
    this.filteredOptions = this.games.filter(game => game.name.toLowerCase().includes(filterValue))
  }
  
  selected(e: Game) {
    this.addGame(e)
  }
  
  get selectedGames(): Game[] {
    return this._selectedGames
  }
  set selectedGames(games: Game[]){
    this._selectedGames = games
  }
}
