import { Injectable } from '@angular/core';
import { AuthUser } from '../interfaces/auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: AuthUser | null = null;

  setUser(user: AuthUser): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): AuthUser | null {
    if (this.user) {
      return this.user;
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        return this.user;
      }
    }
    return null;
  }

  clearUser(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  getRole(): 'guest' | 'user' | 'admin' {
    const user = this.getUser();
    return user ? user.role : 'guest';
  }
}
