import { Component, Input, Output, EventEmitter, OnInit, inject, signal, effect, WritableSignal } from '@angular/core';
import { User } from 'src/app/classes/user';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TallyAnimationState } from 'src/app/enums/tally-animation-state';
import { PictureService } from 'src/app/services/picture.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss'],
  animations: [
    trigger('movementState', [
      state(TallyAnimationState.inPlace, style({
        opacity: 1
      })),
      state(TallyAnimationState.fadeOutToLeft, style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state(TallyAnimationState.fadeOutToRight, style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state(TallyAnimationState.fadeOutToBottom, style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      state(TallyAnimationState.fadeOutToTop, style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      state(TallyAnimationState.snapLeft, style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state(TallyAnimationState.snapRight, style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state(TallyAnimationState.snapRightFromBottom, style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state(TallyAnimationState.fadeIn, style({
        opacity: 1,
        transform: 'translateX(0)'
      })),

      transition(`${TallyAnimationState.inPlace} => ${TallyAnimationState.fadeOutToLeft}`, animate ('400ms ease-in')),
      transition(`${TallyAnimationState.fadeOutToLeft} => ${TallyAnimationState.snapRight}`, animate ('0ms')),
      transition(`${TallyAnimationState.snapRight} => ${TallyAnimationState.fadeIn}`, animate ('800ms ease-out')),
      transition(`${TallyAnimationState.fadeIn} => ${TallyAnimationState.inPlace}`, animate('0ms')),
      transition(`${TallyAnimationState.inPlace} => ${TallyAnimationState.fadeOutToBottom}`, animate('800ms ease-in')),
      transition(`${TallyAnimationState.inPlace} => ${TallyAnimationState.fadeOutToTop}`, animate('800ms ease-in')),
      transition(`${TallyAnimationState.fadeOutToBottom} => ${TallyAnimationState.snapRight}`, animate('0ms')),
      transition(`${TallyAnimationState.inPlace} => ${TallyAnimationState.fadeOutToRight}`, animate ('400ms ease-in')),
      transition(`${TallyAnimationState.fadeOutToRight} => ${TallyAnimationState.snapLeft}`, animate ('0ms')),
      transition(`${TallyAnimationState.snapLeft} => ${TallyAnimationState.fadeIn}`, animate ('800ms ease-out')),
    ])
  ]
})
export class TallyComponent{

  @Input()
  user: WritableSignal<User> = signal(new User())

  @Input()
  state: TallyAnimationState = TallyAnimationState.fadeIn

  @Output()
  animationEnded = new EventEmitter<TallyAnimationState>()

  @Output()
  rejected: EventEmitter<User> = new EventEmitter<User>()

  @Output()
  startedChat: EventEmitter<User> = new EventEmitter<User>()

  pictureSrv: PictureService = inject(PictureService)
  userImg = signal("")

  constructor() {
    effect(() => {
      let tmpUsr: User = this.user()
      this.userImg.set(tmpUsr.profileImg)
      if(tmpUsr.username !== undefined){
        this.pictureSrv.getUserPicture(tmpUsr.username)
          .pipe(first())
          .subscribe(img => {
            let blob = new Blob([img], { type: 'image/jpg' });
            let url = window.URL.createObjectURL(blob);
            this.userImg.set(url)
          })}

    }, {allowSignalWrites: true})
  }

  onAnimationEnd(s: TallyAnimationState) {
    this.animationEnded.emit(s)
  }

  onStartedChat() {
    this.startedChat.emit(this.user())
  }

  onRejected() {
    this.rejected.emit(this.user())
  }
}
