// src/app/shared/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { USERS } from '../mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal<boolean>(false);
  private currentUser = signal<string | null>(null);

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
        }

        return isAuthenticated;
      })
    );
  }

  logout(): void {
    this.loggedIn.set(false);
    this.currentUser.set(null);
  }
}
