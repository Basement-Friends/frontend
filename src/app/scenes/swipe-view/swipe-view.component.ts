import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/enums/gender';
import { TallyAnimationState } from 'src/app/enums/tally-animation-state';
import { GamePlatform } from 'src/app/interfaces/gamePlatform';
import { User } from 'src/app/classes/user';
import { SearchContainerService } from 'src/app/services/search-container.service';
import { Game } from 'src/app/interfaces/game';
import { UsersService } from 'src/app/services/users.service';
import { filter, map } from 'rxjs';
import { Router } from '@angular/router';

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
export class SwipeViewComponent implements OnInit {

  gamesToSearchBy: Game[] = []
  users: User[] = []
  currentUserId: number = 0

  previousUser!: User
  nextUser!: User

  tallyState: TallyAnimationState = TallyAnimationState.inPlace

  constructor(
    private gamesSrv: SearchContainerService,
    private userSrv: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.previousUser = this.getPrevGamer()
      this.nextUser = this.getNextGamer()
      this.gamesToSearchBy = this.gamesSrv.selectedGames
      if(this.gamesToSearchBy.length < 1)
      {
        this.router.navigate(['/'])
        return
      }
      this.userSrv.getGamers().pipe(
        map(users => {
          users.forEach(gamer => {
            let user: User = gamer
            console.log(user)
            user.username = gamer.nickname
            this.users.push(user)
          })          
          return users
        }),
        filter(gamers => {
            console.log("pre-filter gamers: ", gamers)
            gamers.filter(gamer => {
                    if (gamer === null)
                      return false
                    return gamer.checkIfContainsGames(this.gamesToSearchBy)
                })
              console.log("post-filter gamers: ", gamers)
              return true
            })
          ).subscribe(gamers => {
            this.users = gamers
            console.log(this.users[this.currentUserId])
          })    
  }
  
  onNextClick(): void{
    this.tallyState = TallyAnimationState.fadeOutToLeft
  }

  onPrevClick(): void{
    this.tallyState = TallyAnimationState.fadeOutToRight
  }

  onRejected(user: User): void{
    this.tallyState = TallyAnimationState.fadeOutToBottom
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

//  users2: User[] = [
//   {
//     name: "Mahatma",
//     lastName: "Gandhi",
//     nickName: "BigG",
//     description: "I want to play Civ ad destroy my enemies with nuclear fire!!!",
//     email: "mgandhi@killemwithnukes.in",
//     profileImg: "assets/profile.png",
//     gender: Gender.Male,
//     isIncel: true,
//     platformUser: [{
//       nick: "BigGWithDemNukesToBurmSuckaz",
//       profileImgSourse: "src/assets/profile.png",
//       platform: steam
//     },
//       {
//       nick: "BigG",
//       profileImgSourse: "src/assets/profile.png",
//       platform: epic
//     }
//     ]
//   },
//   {
//     name: "Theresa",
//     lastName: "Bojaxhiu",
//     nickName: "MommaPain",
//     description: "Suffer 4 Gawd!",
//     email: "theresamommy@letemsuffer.in",
//     profileImg: "assets/profile2.png",
//     gender: Gender.Female,
//     isIncel: true,
//     platformUser: [{
//       nick: "MommaPain",
//       profileImgSourse: "src/assets/profile2.png",
//       platform: steam},
//       {
//       nick: "MommaPain",
//       profileImgSourse: "src/assets/profile2.png",
//       platform: epic}
//     ]},
//     {
//       name: "Alexandros",
//       lastName: "O Megas",
//       nickName: "AlphaAlex",
//       description: "Let's conquer the world together!",
//       email: "oMegasAlexandros@worldconqueror.gr",
//       profileImg: "https://images.unsplash.com/photo-1641563127349-c9d58bc9847d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxleGFuZGVyJTIwdGhlJTIwZ3JlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//       gender: Gender.Male,
//       isIncel: false,
//       platformUser: [{
//         nick: "AlphaAlex",
//         profileImgSourse: "https://images.unsplash.com/photo-1641563127349-c9d58bc9847d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxleGFuZGVyJTIwdGhlJTIwZ3JlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//         platform: steam},
//         {
//         nick: "AlphaAlex",
//         profileImgSourse: "https://images.unsplash.com/photo-1641563127349-c9d58bc9847d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxleGFuZGVyJTIwdGhlJTIwZ3JlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//         platform: epic}
//       ]},
//       {
//         name: "Imhotep",
//         lastName: "",
//         nickName: "MegaImho",
//         description: "Building better world",
//         email: "imhotep@pyramids.eg",
//         profileImg: "https://images.unsplash.com/photo-1695901742041-5b56f69b17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1ob3RlcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
//         gender: Gender.Male,
//         isIncel: false,
//         platformUser: [{
//           nick: "MegaImho",
//           profileImgSourse: "https://images.unsplash.com/photo-1695901742041-5b56f69b17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1ob3RlcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
//           platform: steam},
//           {
//           nick: "ImhoMega",
//           profileImgSourse: "https://images.unsplash.com/photo-1695901742041-5b56f69b17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1ob3RlcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
//           platform: epic}
//         ]}
// ]


}
