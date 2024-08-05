import { Injectable } from '@angular/core';
import { Notify } from 'notiflix';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKeyPrefix = 'favorites_';
  private userId: string | null = null;
  private favorites: Set<string> = new Set();

  constructor() { }

  setUser(userId: string | null): void {
    this.userId = userId;
    this.loadFavorites();
  }

  private getStorageKey(): string {
    return `${this.favoritesKeyPrefix}${this.userId}`;
  }

  private loadFavorites(): void {
    if (!this.userId) {
      this.favorites.clear();
      return;
    }

    const storedFavorites = localStorage.getItem(this.getStorageKey());
    if (storedFavorites) {
      this.favorites = new Set(JSON.parse(storedFavorites));
    } else {
      this.favorites.clear();
    }
  }

  private saveFavorites(): void {
    if (this.userId) {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(Array.from(this.favorites)));
    }
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.has(recipeId);
  }

  toggleFavorite(recipeId: string): void {
    if (this.isFavorite(recipeId)) {
      this.favorites.delete(recipeId);
    } else {
      this.favorites.add(recipeId);
      Notify.success('Рецепт добавлен в избранное');
    }
    this.saveFavorites();
  }

  getFavorites(): string[] {
    return Array.from(this.favorites);
  }
}
