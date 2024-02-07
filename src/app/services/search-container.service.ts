import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class SearchContainerService {

  private gamesEndpoint: string = "http://localhost:8080/api/game/all"

  private _selectedGames: Game[] = []

  public get selectedGames(): Game[] {
    return this._selectedGames
  }

  public set selectedGames(games: Game[]) {
    this._selectedGames = games
  }

  addSelectedGame(game: Game): void {
    this._selectedGames.push(game)
  }

  removeSelectedGames(id: number): void {
    this._selectedGames.filter(game => game.id !== id)
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getGames(){
    return this.httpClient.get<Game[]>(this.gamesEndpoint)
  }

  addUserGame(game: Game){
    let gameToAdd = {
      game: game.name,
      gameStartDate: Date.now(),
      additionalInformation: ""
    }
    this.httpClient.put(this.gamesEndpoint, gameToAdd)
  }
}
