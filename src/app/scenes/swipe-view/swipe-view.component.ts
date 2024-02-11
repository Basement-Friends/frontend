import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Gender } from 'src/app/enums/gender';
import { TallyAnimationState } from 'src/app/enums/tally-animation-state';
import { GamePlatform } from 'src/app/interfaces/gamePlatform';
import { User } from 'src/app/classes/user';
import { SearchContainerService } from 'src/app/services/search-container.service';
import { Game } from 'src/app/interfaces/game';
import { UsersService } from 'src/app/services/users.service';
import { filter, first, map } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ChatsService } from 'src/app/services/chats.service';

let steam: GamePlatform = {
  name: "Steam",
  platformImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpl.m.wikipedia.org%2Fwiki%2FPlik%3ASteam_icon_logo.svg&psig=AOvVaw2o2h6Zw8PVRl5gPtnGe78e&ust=1696876145008000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCKDblbOK54EDFQAAAAAdAAAAABAD"
}

let epic: GamePlatform = {
  name: "EpicGames",
  platformImage: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F31%2FEpic_Games_logo.svg%2F1764px-Epic_Games_logo.svg.png&tbnid=ivIKZnmNWWahfM&vet=12ahUKEwi6-vztiueBAxXRDRAIHa1BBbQQMygAegQIARBE..i&imgrefurl=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3AEpic_Games_logo.svg&docid=wQ6LfpKY2SoAwM&w=1764&h=2048&q=epic%20games%20logo&ved=2ahUKEwi6-vztiueBAxXRDRAIHa1BBbQQMygAegQIARBE"
}

@Component({
  selector: 'app-swipe-view',
  templateUrl: './swipe-view.component.html',
  styleUrls: ['./swipe-view.component.scss']
})
export class SwipeViewComponent implements OnInit, OnChanges {
  loggedUser: User | null = null
  gamesToSearchBy: Game[] = []
  preferedGender: Gender | null = null
  users: User[] = []
  currentUserId: number = 0

  existingChats: string[] = []

  previousUser!: User
  nextUser!: User

  tallyState: TallyAnimationState = TallyAnimationState.inPlace

  constructor(
    private gamesSrv: SearchContainerService,
    private userSrv: UsersService,
    private loginSrv: LoginService,
    private chatsSrv: ChatsService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['users'] || changes['existingChats'])
    console.log(this.users);
  }

  ngOnInit(): void {
      this.setupValues();
      if(this.gamesToSearchBy.length < 1)
      {
        this.router.navigate(['/'])
        return
      }
      this.getDataFromServer()
    }

    getDataFromServer() {
      this.chatsSrv.getChats()
        .pipe(first())
        .subscribe(chats => chats.forEach(chat => 
          {
            this.existingChats.push(chat.name)
            if(this.users.length > 0)
              this.users.filter(user => user.username === undefined ? false : this.existingChats.includes(user.username))
          }          
        ))        

      this.userSrv.getGamers().pipe(
        map(users => {
          users.forEach((user: any) => {
            let newUser: User = new User();
            newUser.copy(user);
            if (newUser.checkIfContainsGames(this.gamesToSearchBy) && user.firstName !== undefined && !this.existingChats.includes(user.firstName))
              this.users.push(newUser);
          })
          this.filterUsersByPreferences(this.preferedGender);
          return this.users;
        }))
        .subscribe(users => this.users = users);
    }
  
  private setupValues() {
    this.previousUser = this.getPrevGamer();
    this.nextUser = this.getNextGamer();
    this.preferedGender = this.gamesSrv.selectedGender
    this.gamesToSearchBy = this.gamesSrv.selectedGames;

    this.loginSrv.loggedUser$.pipe(
      filter(currentUser => currentUser !== undefined),
      ).subscribe((user?: User | null) => {
        if (user !== null && user !== undefined)
          this.loggedUser = user;
        this.users = this.users.filter(user => {
          return user.username !== this.loggedUser?.username
        })
    })
  }

  private filterUsersByPreferences(preferedGender: Gender | null = null) {
    this.users = this.users.filter(user => {      
      if(user.username === this.loggedUser?.username)
        return false
      if (user === null)
        return false;
      if (user.gender !== preferedGender && preferedGender !== null)
        return false;
      return true
    })
  }

  onNextClick(): void{
    this.tallyState = TallyAnimationState.fadeOutToLeft
  }

  onPrevClick(): void{
    this.tallyState = TallyAnimationState.fadeOutToRight
  }

  onAccepted(chatttedUser: User) {
    if(this.loggedUser === null || this.loggedUser === undefined)
      return
    console.log(this.loggedUser);
    this.users = this.users.filter(user => user !== chatttedUser)
    this.chatsSrv.createChat(this.loggedUser, chatttedUser)
  }

  onRejected(remUser: User): void{
    this.tallyState = TallyAnimationState.fadeOutToBottom
    this.users = this.users.filter(user => user !== remUser)
  }

  progressAnimation(prevState: TallyAnimationState): void{
    switch(prevState){
      case TallyAnimationState.fadeOutToLeft:
        this.tallyState = TallyAnimationState.snapRight
        break
      case TallyAnimationState.snapRight:
        this.incrementGamerId();
        this.tallyState = TallyAnimationState.fadeIn
        break
      case TallyAnimationState.fadeIn:
        this.tallyState = TallyAnimationState.inPlace
        break;
      case TallyAnimationState.fadeOutToRight:
        this.tallyState = TallyAnimationState.snapLeft
        break
      case TallyAnimationState.snapLeft:
        this.decrementGamerId();
        this.tallyState = TallyAnimationState.fadeIn
        break
      case TallyAnimationState.fadeOutToBottom:
        this.tallyState = TallyAnimationState.snapRight
        break
    }
  }

  incrementGamerId(): void{
    if(++this.currentUserId > this.users.length - 1)
      this.currentUserId = 0
    this.previousUser = this.getPrevGamer()
    this.nextUser = this.getNextGamer()
  }

  decrementGamerId(): void{
    if(--this.currentUserId < 0)
      this.currentUserId = this.users.length - 1
    this.previousUser = this.getPrevGamer()
    this.nextUser = this.getNextGamer()
  }

  getNextGamer(): User {
    return this.currentUserId + 1 > this.users.length - 1 ?
      this.users[0] : this.users[this.currentUserId + 1]
  }

  getPrevGamer(): User {
    return this.currentUserId - 1 < 0 ?
      this.users[this.users.length - 1] : this.users[this.currentUserId - 1]
  }
}
