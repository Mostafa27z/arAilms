import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,CommonModule,CarouselModule],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ailms';
  slides = [
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      "./assets/laptop.PNG" ,
      
   "./assets/books.png" 
  ];
}
