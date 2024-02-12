import { Component, EventEmitter, OnInit, Output, effect, signal } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ChatsService } from 'src/app/services/chats.service';
import { LoginService } from 'src/app/services/login.service';


export class ChatData {
  chatId: string = ""
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

  chats = signal<ChatData[]>([])

  constructor(
    private chatsSrv: ChatsService,
    private loginSrv: LoginService
  ) {}

  ngOnInit(): void {
    this.loginSrv.isLoggedIn$.subscribe(isLoggedIn => {
      if(isLoggedIn){
        this.chatsSrv.getChats().subscribe(chat => {
        this.chats.update(() => [])
        chat.forEach(chat => 
          this.chats.update(val => ([...val, chat]))
          ) })
      }
    }
    )
  }

  select(data: ChatData){
    this.chatOpened.emit(data)
  }
}
