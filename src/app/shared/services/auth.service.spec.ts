import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in user1 with correct credentials', (done) => {
    service.login('user1', 'password1').subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeTrue();
      expect(service.isLoggedIn).toBeTrue();
      expect(sessionStorage.getItem('currentUser')).toBe('user1');
      done();
    });
  });

  it('should log out a user', (done) => {
    service.login('user1', 'password1').subscribe(() => {
      service.logout();
      expect(service.isLoggedIn).toBeFalse();
      expect(sessionStorage.getItem('currentUser')).toBeNull();
      done();
    });
  });
});
