import { EventEmitter, Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, switchAll, tap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket'
import { Message } from '../classes/message';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { ChatData } from '../components/chats-list/chats-list.component';

export const WS_URL = ""

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private chatUrl: string = "http://localhost:8080/api/chat"

  // private socket$?: WebSocketSubject<any>
  // private msgSubject$ = new Subject()
  // public msg$ = this.msgSubject$.pipe(switchAll(), catchError(e => {throw e}))

  constructor(
    private http: HttpClient
  ) { }

  
  createChat(author: User, receiver: User){
    console.log(`chat between ${author.username} and ${receiver.username}`);
    this.http.post(`${this.chatUrl}/create`, { usernames: [author.name, receiver.name]}).subscribe(rv => console.log(rv))
  }
  
  getChats() {
    return this.http.get<ChatData[]>(`${this.chatUrl}/myChats`)
  }

  getMessages(chatId: number) {
    return this.http.get<Message[]>(`${this.chatUrl}/${chatId}`)
  }

  sendMessage(msg: Message) {
    return this.http.post<Message[]>(`${this.chatUrl}/${msg.chatId}`, msg)
  }

  // public connect(): void {
  //   if(!this.socket$ || this.socket$.closed) {
  //     this.socket$ = webSocket(WS_URL)
  //     const msg = this.socket$.pipe(
  //       tap({
  //         error: e => console.log(e)
  //       }), catchError(_ => EMPTY))
      
  //       this.msgSubject$.next(msg)
  //   }
  // }

  // sendMsg(msg: Message) {
  //   this.socket$?.next(msg)
  // }

  // close(){
  //   this.socket$?.complete()
  // }
}
