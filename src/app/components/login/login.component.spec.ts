import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error messages if username or password is missing', () => {
    component.handleLogin();
    fixture.detectChanges();

    expect(component.errorMessages.username).toBe('Username is required.');
    expect(component.errorMessages.password).toBe('Password is required.');
  });

  it('should log in and navigate to dashboard on successful login', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    authServiceSpy.login.and.returnValue(of(true));

    component.handleLogin();
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.generalErrorMessage).toBe('');
  });

  it('should show error message on failed login', () => {
    component.username = 'testuser';
    component.password = 'wrongpassword';
    authServiceSpy.login.and.returnValue(of(false));

    component.handleLogin();
    fixture.detectChanges();

    expect(component.generalErrorMessage).toBe('Invalid username or password.');
  });

  it('should show error message if login throws an error', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.handleLogin();
    fixture.detectChanges();

    expect(component.generalErrorMessage).toBe('An error occurred during login.');
  });

  it('should log out and set isLoggedIn to false', () => {
    component.isLoggedIn = true;
    component.handleLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(component.isLoggedIn).toBe(false);
  });
});
