import { Gender } from "../enums/gender"
import { Game } from "../interfaces/game"
import { GamePlatform } from "../interfaces/gamePlatform"
import { UserGameRecord } from "./user-game-record"

export class User {
    name: string | undefined
    lastName: string | undefined
    private _username: string | undefined
    get username(): string | undefined { return this._username }
    set username(nUsername: string) { 
        this._username = nUsername 
        this.nickname = nUsername
    }
    nickname: string | undefined
    description: string | undefined
    email: string | undefined
    profileImg: string = "/assets/defaultAvatar.png"
    gender: Gender | undefined
    isIncel: boolean | undefined
    platformUser: {nick: string, profileImgSourse: string, platform: GamePlatform}[] | undefined
    private gameRecords: UserGameRecord[] = []
    private ranks: any[] = []

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

    // constructor(name: string, lastName: string, nickName: string, email: string, description?: string, profileImg?: string, gender: Gender = Gender.Other, isIncel: boolean = false, platformUser: any = null){
    //     this.name = name        
    //     this.lastName = lastName
    //     this.nickName = nickName
    //     this.description = description
    //     this.email = email
    //     if(profileImg !== undefined)
    //         this.profileImg = profileImg
    //     this.gender = gender
    //     this.isIncel = isIncel
    //     this.platformUser = platformUser
    // }
}
