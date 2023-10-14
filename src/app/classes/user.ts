import { Gender } from "../enums/gender"
import { GamePlatform } from "../interfaces/gamePlatform"

export class User {
    name: string | undefined
    description: string | undefined
    email: string | undefined
    profileImg: string | undefined
    gender: Gender | undefined
    isIncel: boolean | undefined
    platformUser: {nick: string, profileImgSourse: string, platform: GamePlatform}[] | undefined

    constructor(user: User){
        this.name = user.name        
        this.description = user.description
        this.email = user.email
        this.profileImg = user.profileImg
        this.gender = user.gender
        this.isIncel = user.isIncel
        this.platformUser = user.platformUser
    }
}
