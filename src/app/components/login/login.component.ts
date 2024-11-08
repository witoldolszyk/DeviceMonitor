import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessages: { username?: string; password?: string;} = {};
  generalErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  handleLogin(): void {
    this.clearErrorMessages();

    if (this.isFormValid()) {
      this.authService.login(this.username, this.password).subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/dashboard']);
          } else {
            this.generalErrorMessage = 'Invalid username or password.';
            this.cdr.markForCheck(); 
          }
        },
        error: () => {
          this.generalErrorMessage = 'An error occurred during login.';
          this.cdr.markForCheck();           
        }
      });
    } else {
      this.setErrorMessages();
    }
  }

  private clearErrorMessages(): void {
    this.errorMessages = {};
    this.generalErrorMessage = '';
  }

  private setErrorMessages(): void {
    if (!this.username) {
      this.errorMessages.username = 'Username is required.';
    }
    if (!this.password) {
      this.errorMessages.password = 'Password is required.';
    }
  }

  private isFormValid(): boolean {
    return !!this.username && !!this.password;
  }
}
