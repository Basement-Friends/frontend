import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class ChatComponent implements OnChanges, OnInit {
  @Input() data!: ChatData
  @ViewChild('msgTextArea') msgInput: any
  messages: ReceivedMsg[] = []

  messagesSub: Subscription | null = null
  msgControl: FormControl = new FormControl('', [Validators.required])

  constructor(
    private chatSrv: ChatsService,
    private loginSrv: LoginService
  ) {}

  ngOnInit(): void {
    this.loginSrv.isLoggedIn$.subscribe(isIn => {
      if(isIn)
        this.messagesSub =this.chatSrv.getMessages(this.data.chatId)
          .pipe(first())
          .subscribe()
      else
        this.messages = []
      
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      if(this.messagesSub !== null)
        this.messagesSub.unsubscribe()
      if(this.data.chatId !== "")
        this.messagesSub = this.chatSrv.getMessages(this.data.chatId)
          .subscribe((messages: ReceivedMsg[]) =>{ 
            this.messages = messages
          })
    }
  }

  sendMessage() {
    let msg: Message = new Message()
    msg.chatId = this.data.chatId
    msg.msgText = this.msgControl.value
    this.msgControl.reset()
    debugger
    this.chatSrv.sendMessage(msg)
  }
}
