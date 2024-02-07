import { Game } from "../interfaces/game";

export class UserGameRecord {
    game?: Game
    archievements: any[] = []
    gameStartDate?: Date
    additionalInformation: string = ""
}
