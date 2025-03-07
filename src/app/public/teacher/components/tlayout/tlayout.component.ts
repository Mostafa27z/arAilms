import { Component } from '@angular/core';
import { TasideComponent } from '../taside/taside.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tlayout',
  imports: [TasideComponent, RouterOutlet],
  templateUrl: './tlayout.component.html',
  styleUrl: './tlayout.component.scss'
})
export class TlayoutComponent {

}
