import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Allows route activation if the user is logged in; otherwise, redirects to the login page
  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
