import { Injectable } from '@angular/core';
import { catchError, first, throwError } from 'rxjs';
import { Message } from '../classes/message';
import { User } from '../classes/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChatData } from '../components/chats-list/chats-list.component';
import { ReceivedMsg } from '../components/chat/chat.component';

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
    console.log(author, receiver);
    this.http.post(`${this.chatUrl}/create`, { usernames: [author.username, receiver.username]}).subscribe(rv => {
      console.log(rv)
      this.getChats();
    })
  }
  
  getChats() {
    return this.http.get<ChatData[]>(`${this.chatUrl}/myChats`)
  }

  getMessages(chatId: string) {
    return this.http.get<ReceivedMsg[]>(`${this.chatUrl}/getMessages/${chatId}`)
  }

  sendMessage(msg: Message) {
    this.http.post(`${this.chatUrl}/sendMessage/${msg.chatId}`, msg)
    .pipe(
      catchError(this.handleError),
      first()
    )
    .subscribe()
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) 
      console.error("An error occurred: ", error.error)
    else if(error.status === 406)
      alert("Don't send toxic messages!")
    else
      console.error(`Error code ${error.status}, body: `, error.error);

    return throwError(() => new Error("Error occured"))
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
