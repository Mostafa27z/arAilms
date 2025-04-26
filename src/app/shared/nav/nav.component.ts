import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  isMenuOpen = false;
  isSmallScreen = false;
  isLoggedIn = false;

  ngOnInit() {
    this.checkScreenSize();
    this.checkLoginStatus();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkLoginStatus() {
    // example: checking if token exists
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    window.location.reload(); // or navigate to login
  }
}
