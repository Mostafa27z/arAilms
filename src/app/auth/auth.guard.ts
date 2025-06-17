import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return this.router.parseUrl('/login');
    }

    const user = JSON.parse(userData);
    const expectedRole = route.data['role'];

    if (expectedRole && user.role !== expectedRole) {
      // Redirect to default dashboard based on role
      switch (user.role) {
        case 'student': return this.router.parseUrl('/student/dashboard');
        case 'teacher': return this.router.parseUrl('/teacher/dashboard');
        case 'parent': return this.router.parseUrl('/parents/dashboard');
        case 'admin': return this.router.parseUrl('/admin/dashboard');
        case 'supervisor': return this.router.parseUrl('/supervisor/dashboard');
        default: return this.router.parseUrl('/');
      }
    }

    return true;
  }
}
