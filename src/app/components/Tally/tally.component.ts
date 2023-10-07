import { Component, Input } from '@angular/core';
import { Gender } from 'src/app/enums/gender';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss'],
})
export class TallyComponent {  
  @Input()
  user!: User;

}
