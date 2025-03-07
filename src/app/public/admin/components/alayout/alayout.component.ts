import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AasideComponent } from '../aaside/aaside.component';

@Component({
  selector: 'app-alayout',
  imports: [RouterOutlet,AasideComponent],
  templateUrl: './alayout.component.html',
  styleUrl: './alayout.component.scss'
})
export class AlayoutComponent {

}
