import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ChatData } from './components/chats-list/chats-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'basement-friends';
  @ViewChild('nestedDrawer') nestedDrawer!: any
  @ViewChild('drawer') drawer! : any

  selectedChatData: ChatData = new ChatData()

  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.loginService.onInit()
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      if(!isLoggedIn)
        this.drawer.close()
    })
  }

  backHome(){
    this.router.navigateByUrl("/")
  }

  chatSelected(chatData: ChatData){
    if(this.selectedChatData.chatId === chatData.chatId)
        this.nestedDrawer.toggle()
    this.selectedChatData = chatData
  }
}
