import { Gender } from "../enums/gender"
import { Game } from "../interfaces/game"
import { GamePlatform } from "../interfaces/gamePlatform"
import { UserGameRecord } from "./user-game-record"

export class User {
    name: string | undefined
    lastName: string | undefined
    private _username: string | undefined
    get username(): string | undefined { 
        if(this._username === undefined && this.nickname !== undefined)
            return this.nickname
        if(this._username !== undefined && this.nickname === undefined)
            return this._username
        return this._username
     }
    set username(nUsername: string) { 
        this._username = nUsername 
        this.nickname = nUsername
    }
    private nickname: string | undefined
    description: string | undefined
    email: string | undefined
    profileImg: string = "/assets/defaultAvatar.png"
    gender: Gender | undefined
    isIncel: boolean | undefined
    platformUser: {nick: string, profileImgSourse: string, platform: GamePlatform}[] | undefined
    private gameRecords: UserGameRecord[] = []
    private ranks: any[] = []

    copy(user: User){
        this.name = user.name        
        this.lastName = user.lastName
        this.nickname = user.nickname
        this.description = user.description
        this.email = user.email
        if(user.profileImg !== undefined)
            this.profileImg = user.profileImg
        else
            this.profileImg = "/assets/defaultAvatar.png"
        this.gender = user.gender
        this.isIncel = user.isIncel
        this.platformUser = user.platformUser
        this.gameRecords = user.gameRecords
    }

    private checkForGameByString(gamesName: string[]): boolean {
        if(gamesName.length < 1)
            throw new Error("Can't check for empty array")
        if(this.gameRecords.length < 1)
            return false
        return this.gameRecords.some(record => {
            if(record.game === null || record.game === undefined)
                return false
            return gamesName.some(gameName => gameName === record.game!.name)
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
            return games.some(game => game.name === record.game!.name)
        })        
    }

    public checkIfContainsGames(a: string[] | Game[]){
        if(this.gameRecords === null)
            return false
        if(a.length < 1)
            throw new Error("Can't check for empty array")
        if(typeof a[0] === 'string')
            return this.checkForGameByString(a as string[])
        else
            return this.checkForGameByGame(a as Game[])
    }

    constructor(){
        if(this.username !== undefined && this.nickname === undefined)
            this.nickname = this.username
        else if(this.username === undefined && this.nickname !== undefined)
            this.username = this.nickname
    }
}
