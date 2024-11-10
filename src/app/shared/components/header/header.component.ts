import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent {
  // Injecting AuthService and Router via constructor
  constructor(private authService: AuthService, private router: Router) { }

  // Logout method to sign out and navigate to the login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
