import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RecipeService } from '../services/recipe.service';
import { Post } from '../interfaces/post';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private recipesData: RecipeService, private title: Title, private meta: Meta, private favoritesService: FavoritesService) {
    this.getPost();
  }


  recipes: Post[] = [];

  getPost() {
    this.recipesData.getPosts().subscribe({
      next: (response: Post[]) => {
        this.recipes = response;
      }
    })

  }
  isFavorite(recipeId: string): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  toggleFavorite(recipeId: string): void {
    this.favoritesService.toggleFavorite(recipeId);
  }


  ngOnInit(): void {
    this.title.setTitle('Каталог рецептов');
    this.meta.updateTag({ property: 'og:title', content: 'Foodie: Каталог рецептов»' })
    this.meta.updateTag({ property: 'og:desc', content: 'Все самые лучшие рецепты собраны здесь' })

  }

}
