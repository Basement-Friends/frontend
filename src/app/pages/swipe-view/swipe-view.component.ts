import { Component } from '@angular/core';
import { Gender } from 'src/app/enums/gender';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-swipe-view',
  templateUrl: './swipe-view.component.html',
  styleUrls: ['./swipe-view.component.scss']
})
export class SwipeViewComponent {

 users: User[] = [
  {
    name: "Mahatma",
    description: "I want to play Civ ad destroy my enemies with nuclear fire!!!",
    email: "mgandhi@killemwithnukes.in",
    profileImg: "assets/profile.png",
    gender: Gender.Male,
    isIncel: true,
    platformUser: [{
      nick: "BigG",
      profileImgSourse: "src/assets/profile.png",
      platform: {
        name: "Steam",
        platformImage: null
      }},
      {
      nick: "BigG",
      profileImgSourse: "src/assets/profile.png",
      platform: {
        name: "EpicGames",
        platformImage: null
      }}
    ]
  },
  {
    name: "Theresa",
    description: "Suffer 4 Gawd!",
    email: "theresamommy@letemsuffer.in",
    profileImg: "assets/profile2.png",
    gender: Gender.Female,
    isIncel: true,
    platformUser: [{
      nick: "MommaPain",
      profileImgSourse: "src/assets/profile2.png",
      platform: {
        name: "Steam",
        platformImage: null
      }},
      {
      nick: "MommaPain",
      profileImgSourse: "src/assets/profile2.png",
      platform: {
        name: "EpicGames",
        platformImage: null
      }}
    ]}
]


}
