import { Gender } from "../enums/gender"
import { GamePlatform } from "./gamePlatform"

export interface User {
    name: string
    description: string
    email: string
    profileImg: string,
    gender: Gender,
    isIncel: boolean,
    platformUser: {nick: string, profileImgSourse: string, platform: GamePlatform}[]
}
