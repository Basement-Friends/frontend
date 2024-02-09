import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ChatsService } from 'src/app/services/chats.service';


export class ChatData {
  chatId: number = -1
  name: string = ""

  users: User[] = []
}


@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent implements OnInit {

  @Output() chatOpened: EventEmitter<ChatData> = new EventEmitter<ChatData>()

  chats: ChatData[] = []


  constructor(
    private chatsSrv: ChatsService
  ) {}

  ngOnInit(): void {
      this.chatsSrv.getChats().subscribe(chat => {
        console.log(chat);
        chat.forEach(chat => this.chats.push(chat))
      })
  }

  select(data: ChatData){
    this.chatOpened.emit(data)
  }
}
