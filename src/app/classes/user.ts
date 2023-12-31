import { Gender } from "../enums/gender"
import { GamePlatform } from "../interfaces/gamePlatform"

export class User {
    name: string | undefined
    lastName: string | undefined
    nickName: string | undefined
    description: string | undefined
    email: string | undefined
    profileImg: string = "/assets/defaultAvatar.png"
    gender: Gender | undefined
    isIncel: boolean | undefined
    platformUser: {nick: string, profileImgSourse: string, platform: GamePlatform}[] | undefined

    constructor(name: string, lastName: string, nickName: string, email: string, description?: string, profileImg?: string, gender: Gender = Gender.Other, isIncel: boolean = false, platformUser: any = null){
        this.name = name        
        this.lastName = lastName
        this.nickName = nickName
        this.description = description
        this.email = email
        if(profileImg !== undefined)
            this.profileImg = profileImg
        this.gender = gender
        this.isIncel = isIncel
        this.platformUser = platformUser
    }
}
