import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  isMenuOpen = false;
  isSmallScreen = false;
  isLoggedIn = false;
  dashboardPath: string = '';

  ngOnInit() {
    this.checkScreenSize();
    this.checkLoginStatus();
    window.addEventListener('resize', () => this.checkScreenSize());
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
    if (user) {
      const role = JSON.parse(user).role;
      switch (role) {
        case 'student':
          this.dashboardPath = '/student';
          break;
        case 'teacher':
          this.dashboardPath = '/teacher';
          break;
        case 'parent':
          this.dashboardPath = '/parents';
          break;
        case 'admin':
          this.dashboardPath = '/admin';
          break;
        default:
          this.dashboardPath = '/';
      }
    }
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
  navLinks = [
  { label: 'Home', path: '/home' },
  { label: 'Courses', path: '/course' },
  { label: 'About Us', path: '/about' },
  // { label: 'Contact', path: '/contact' }
];

}
