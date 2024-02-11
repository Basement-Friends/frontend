import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  gamesUrl: string = "http://localhost:8080/api/game/all"
  gamersUrl: string = "http://localhost:8080/api/gamer"

  constructor(
    private http: HttpClient
  ) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.gamesUrl)
  }

  addGame(newGame: Game) {
    this.http.put(this.gamersUrl + "/updateProfile", { game: newGame.name, gameStartDate: newGame.gameStartDate, additionalInformation: newGame.additionalInformation})
    .subscribe(e => console.log(e))
  }
}
