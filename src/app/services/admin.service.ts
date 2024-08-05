import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { UserDetail } from '../interfaces/user-detail';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }


  private apiUrl = 'https://evo-academy.wckz.dev/api/cooking-blog/users';

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: string) {
    return this.http.get<UserDetail>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete<UserDetail>(`${this.apiUrl}/${id}`);
  }

  deleteRecipe(id: string) {
    return this.http.delete<Recipe>(`${this.apiUrl}/${id}`);

  }

  updateRecipe(id: string, recipe:Recipe) {
    return this.http.patch<Recipe>(`${this.apiUrl}/${id}`, {recipe});
  }


}
