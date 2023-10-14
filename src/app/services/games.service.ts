import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  gamesEndpoint: string = "assets/mockApi/games.json"

  constructor(
    private httpClient: HttpClient
  ) { }

  getGames(){
    return this.httpClient.get<Game[]>(this.gamesEndpoint)
  }


}
