import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';
import { AuthUser } from '../interfaces/auth-user';
import { UserService } from './user.service';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'authToken';
  private currentUserKey: string = 'currentUser';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private favoritesService: FavoritesService
  ) { }

  loginUser(user: Login, fastJwt: boolean): Observable<AuthUser> {
    let url = 'https://evo-academy.wckz.dev/api/cooking-blog/users/sign';
    if (fastJwt) {
      url += '?fastJwt=true';
    }
    return this.http.post<AuthUser>(url, user).pipe(
      tap((authUser: AuthUser) => {
        this.setToken(authUser.jwtToken);
        this.setCurrentUser(authUser);
        this.userService.setUser(authUser);
        this.favoritesService.setUser(authUser.id);
      })
    );
  }

  logoutUser(): void {
    this.clearToken();
    this.clearCurrentUser();
    this.userService.clearUser();
    this.favoritesService.setUser(null);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setCurrentUser(user: AuthUser): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  private getCurrentUser(): AuthUser | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  private clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  registerUser(user: Register) {
    return this.http.post('https://evo-academy.wckz.dev/api/cooking-blog/users/registration', user);
  }
}
