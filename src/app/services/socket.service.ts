import { EventEmitter, Injectable } from '@angular/core';
import { error } from 'console';
import { EMPTY, Observable, Subject, catchError, switchAll, tap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket'
import { Message } from '../classes/message';

export const WS_URL = ""

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket$?: WebSocketSubject<any>
  private msgSubject$ = new Subject()
  public msg$ = this.msgSubject$.pipe(switchAll(), catchError(e => {throw e}))

  constructor() { }

  public connect(): void {
    if(!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(WS_URL)
      const msg = this.socket$.pipe(
        tap({
          error: e => console.log(e)
        }), catchError(_ => EMPTY))
      
        this.msgSubject$.next(msg)
    }
  }

  sendMsg(msg: Message) {
    this.socket$?.next(msg)
  }

  close(){
    this.socket$?.complete()
  }
}
