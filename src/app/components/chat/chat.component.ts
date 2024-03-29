import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { ChatData } from '../chats-list/chats-list.component';
import { ChatsService } from 'src/app/services/chats.service';
import { Message } from 'src/app/classes/message';
import { Subscription, first } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';

export interface ReceivedMsg {
  sender: User
  message: string
  postTime: Date
  possibleToxicity: boolean
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Input() data: WritableSignal<ChatData> = signal(new ChatData())
  @ViewChild('msgTextArea') msgInput: any
  messages: ReceivedMsg[] = []
  currentUser: User | null | undefined = new User()

  messagesSub: Subscription | null = null
  msgControl: FormControl = new FormControl('', [Validators.required])

  constructor(
    private chatSrv: ChatsService,
    private loginSrv: LoginService
  ) {
    effect(() => {
      if(this.loginSrv.isLoggedIn()){
          this.chatSrv.getMessages(this.data().chatId)
            .pipe(first())
            .subscribe()
      }
      else{
        this.messages = []  
      }
    }),
    effect(() => {
      if(loginSrv.loggedUser() !== null && loginSrv.loggedUser() !== undefined)
        this.currentUser = loginSrv.loggedUser()
    }),
    effect(() => {
      if(chatSrv.recentMessages().length > 0)
        this.messages = this.chatSrv.recentMessages()
      else
        this.messages = []
    })
  }

  sendMessage() {
    let msg: Message = new Message()
    msg.chatId = this.data().chatId
    msg.msgText = this.msgControl.value
    this.msgControl.reset()
    this.chatSrv.sendMessage(msg)
  }
}
