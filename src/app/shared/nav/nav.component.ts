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

  navLinks = [
    { label: 'الرئيسية', path: '/home' },
    { label: 'الدورات', path: '/course' },
    { label: 'من نحن', path: '/about' },
    // { label: 'اتصل بنا', path: '/contact' }
  ];

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
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    window.location.reload(); // أو يمكن إعادة التوجيه إلى صفحة تسجيل الدخول
  }
}
