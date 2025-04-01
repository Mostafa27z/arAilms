import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasideComponent } from '../paside/paside.component';

@Component({
  selector: 'app-playout',
  imports: [RouterOutlet, PasideComponent],
  templateUrl: './playout.component.html',
  styleUrl: './playout.component.scss'
})
export class PlayoutComponent {

}
