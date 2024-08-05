import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://evo-academy.wckz.dev/api/cooking-blog/posts';
  getPosts() {
    return this.http.get<Post[]>(this.apiUrl)
  }
  getRecipe(id: string) {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  sentComment(id: string, text: string) {
    return this.http.post(`${this.apiUrl}/${id}/add-comment`, { text });
  }


  updateRecipe(id: string, recipe: Recipe) {
    return this.http.patch<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  createRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

}
