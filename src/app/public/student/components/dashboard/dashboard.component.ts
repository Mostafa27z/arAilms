import { Component } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';

@Component({
  selector: 'app-dashboard',
  imports: [AsideComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
