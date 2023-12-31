import { User } from "./user";

export class Message {
    id: String = ""
    sender: User
    message: string = ""
    date: Date

    constructor(author: User, content: string = "") {
        this.sender = author
        this.date = new Date(Date.now())
    }
}
