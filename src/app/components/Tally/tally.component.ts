import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TallyAnimationState } from 'src/app/enums/tally-animation-state';

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
      state(TallyAnimationState.snapLeft, style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state(TallyAnimationState.snapRight, style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state(TallyAnimationState.fadeIn, style({
        opacity: 1,
        transform: 'translateX(0)'
      })),

      transition(`${TallyAnimationState.inPlace} => ${TallyAnimationState.fadeOutToLeft}`, animate ('400ms ease-out')),
      transition(`${TallyAnimationState.fadeOutToLeft} => ${TallyAnimationState.snapRight}`, animate ('0ms')),
      transition(`${TallyAnimationState.snapRight} => ${TallyAnimationState.fadeIn}`, animate ('400ms')),
      transition(`${TallyAnimationState.fadeIn} => ${TallyAnimationState.inPlace}`, animate('0ms')),
      transition(`${TallyAnimationState.inPlace} => ${TallyAnimationState.fadeOutToRight}`, animate ('400ms ease-out')),
      transition(`${TallyAnimationState.fadeOutToRight} => ${TallyAnimationState.snapLeft}`, animate ('0ms')),
      transition(`${TallyAnimationState.snapLeft} => ${TallyAnimationState.fadeIn}`, animate ('400ms')),
    ])
  ]
})
export class TallyComponent {  
  @Input()
  user!: User;

  @Input()
  state: TallyAnimationState = TallyAnimationState.fadeIn

  @Output()
  animationEnded = new EventEmitter<TallyAnimationState>();

  onAnimationEnd(s: TallyAnimationState) {
    this.animationEnded.emit(s)
  }
}