import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatData } from '../chats-list/chats-list.component';
import { ChatsService } from 'src/app/services/chats.service';
import { Message } from 'src/app/classes/message';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnChanges, OnInit {
  @Input() data!: ChatData
  messages: Message[] = []

  messagesSub: Subscription | null = null
  msgControl: FormControl = new FormControl('', [Validators.required])

  constructor(
    private chatSrv: ChatsService
  ) {}

  ngOnInit(): void {
    this.chatSrv.getMessages(this.data.chatId)
      .subscribe(messages => console.log("messages: ", messages))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      if(this.messagesSub !== null)
        this.messagesSub.unsubscribe()
      if(this.data.chatId !== -1)
        this.messagesSub = this.chatSrv.getMessages(this.data.chatId)
          .subscribe(messages => console.log("messages: ", messages))
    }
    console.log(this.data.chatId);
  }

  sendMessage() {
    console.log("sending message: ", this.msgControl.value);
  }
}
