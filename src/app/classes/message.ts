import { User } from "./user";

export class Message {
    author: User
    content: string = ""
    date: Date

    constructor(author: User, content: string = "") {
        this.author = author
        this.date = Date.now()
    }
}
