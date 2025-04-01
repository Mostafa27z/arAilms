import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SasideComponent } from '../saside/saside.component';

@Component({
  selector: 'app-slayout',
  imports: [RouterOutlet,SasideComponent],
  templateUrl: './slayout.component.html',
  styleUrl: './slayout.component.scss'
})
export class SlayoutComponent {

}
