import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  errorMessages: { username?: string; password?: string } = {};

  handleLogin(): void {
    this.clearErrorMessages();

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value as { username: string; password: string };
      console.log('Login attempt:', { username, password });
    } else {
      this.setErrorMessages();
    }
  }

  private clearErrorMessages(): void {
    this.errorMessages = {}; 
  }

  private setErrorMessages(): void {
    if (this.usernameControl.hasError('required')) {
      this.errorMessages.username = 'Username is required.';
    }

    if (this.passwordControl.hasError('required')) {
      this.errorMessages.password = 'Password is required.';
    }
  }

  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
