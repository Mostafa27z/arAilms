import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports:[CommonModule]
})
export class HomeComponent implements OnInit {

  loading = true;

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.loading = false;
    }, 1200); // adjust time based on real data loading
  }
}
