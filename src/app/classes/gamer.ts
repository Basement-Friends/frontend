import { Game } from "../interfaces/game"
import { UserGameRecord } from "./user-game-record"

export class Gamer {
    private _firstName: string = ""
    get firstName(): string {
        return this._firstName
    }
    private lastName: string = ""
    private _nickname: string = ""
    get nickname(): string {
        return this._nickname
    }
    private gameRecords: UserGameRecord[] = []
    private ranks: any[] = []

    constructor() {}

    private checkForGameByString(gamesName: string[]): boolean {
        if(gamesName.length < 1)
            throw new Error("Can't check for empty array")
        if(this.gameRecords.length < 1)
            return false
        return this.gameRecords.some(record => {
            if(record.game === null || record.game === undefined)
                return false
            return gamesName.includes(record.game!.name)
        })
    }

    private checkForGameByGame(games: Game[]): boolean {
        if(games.length < 1)
            throw new Error("Can't check for empty array")
        if(this.gameRecords.length < 1)
            return false
        return this.gameRecords.some(record => {
            if(record.game === null || record.game === undefined)
                return false
            return games.includes(record.game!)
        })
    }

    public checkIfContainsGames(a: string[] | Game[]){
        if(typeof a[0] === 'string')
            return this.checkForGameByString(a as string[])
        else
            return this.checkForGameByGame(a as Game[])
    }

    public dick(): boolean{
        console.log("dick")
        return true
    }
}
