import { Component, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ChatData } from './components/chats-list/chats-list.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'basement-friends';
  @ViewChild('nestedDrawer') nestedDrawer!: MatDrawer
  @ViewChild('drawer') drawer! : MatDrawer

  selectedChatData: WritableSignal<ChatData> = signal(new ChatData())

  constructor(
    private router: Router,
    private loginService: LoginService
  ){
    effect(() => {
      if(!loginService.isLoggedIn()){
        this.nestedDrawer.close()
        this.drawer.close()
      }})

  }

  backHome(){
    this.router.navigateByUrl("/")
  }

  chatSelected(chatData: ChatData){
    if(this.selectedChatData().chatId === chatData.chatId || this.selectedChatData().chatId === '')
      this.nestedDrawer.toggle()
    this.selectedChatData.set(chatData)
  }
}
