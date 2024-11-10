import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { USERS } from '../mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal<boolean>(false);
  private currentUser = signal<string | null>(null);

  constructor() {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      this.loggedIn.set(true);
      this.currentUser.set(savedUser);
    }
  }

  get isLoggedIn() {
    return this.loggedIn();
  }

  login(username: string, password: string): Observable<boolean> {
    return of(USERS).pipe(
      delay(500),
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        const isAuthenticated = !!user;

        if (isAuthenticated) {
          this.loggedIn.set(true);
          this.currentUser.set(username);
          sessionStorage.setItem('currentUser', username); 
        }

        return isAuthenticated;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.loggedIn.set(false);
    this.currentUser.set(null);
    sessionStorage.removeItem('currentUser'); 
  }
}
