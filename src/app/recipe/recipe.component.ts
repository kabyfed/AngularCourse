import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../interfaces/recipe';
import { Meta, Title } from '@angular/platform-browser';
import { FavoritesService } from '../services/favorites.service';
import { Post } from '../interfaces/post';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | null = null;
  id: string = '';
  commentText: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private title: Title,
    private favoritesService: FavoritesService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.getPosts();
  }

  recipes: Post[] = [];
  displayedOtherRecipes: Post[] = [];
  displayedTryRecipes: Post[] = [];
  OtherDisplayed = 3;
  tryDisplayed = 4;

  getRecipe(id: string) {
    this.recipeService.getRecipe(this.id).subscribe({
      next: (response: Recipe) => {
        this.recipe = response;
      }
    });
  }

  changeRecipeId(newId: string) {
    this.router.navigate(['/recipes', newId]).then(() => {
      window.location.reload();
    });
  }

  printPage() {
    window.print();
  }

  Share() {
    Notiflix.Confirm.show(
      'Поделиться этим рецептом?',
      'Вы хотите поделиться этим рецептом со всеми?',
      'Закрыть',
      'Поделиться',



      function () { },
      function () { },
      {
        width: '512px',
        fontFamily: 'Inter',
        borderRadius: '8px',
        titleColor: 'rgba(17, 24, 39, 1)',
        cancelButtonBackground: '#3C3B6E',
        cancelButtonColor: '#ffffff',
        okButtonBackground: '#f1f1f1',
        okButtonColor: ' rgba(55, 65, 81, 1)',
      })
  }

  getRandomRecipes(count: number) {
    const shuffled = this.recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  getPosts() {
    this.recipeService.getPosts().subscribe({
      next: (response: Post[]) => {
        this.recipes = response;
        this.displayedOtherRecipes = this.getRandomRecipes(this.OtherDisplayed);;
        this.displayedTryRecipes = this.getRandomRecipes(this.tryDisplayed);
      }
    });
  }

  isFavorite(recipeId: string): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  toggleFavorite(recipeId: string): void {
    this.favoritesService.toggleFavorite(recipeId);
  }

  ngOnInit(): void {
    this.title.setTitle("Рецепт");
    this.getRecipe(this.id);
  }

  sentComment() {
    if (this.commentText.trim() === '') {
      alert('Комментарий не может быть пустым');
      return;
    }
    if (this.recipe) {
      this.recipeService.sentComment(this.recipe.id, this.commentText).subscribe({
        next: () => {
          this.commentText = '';
        }
      });
    }
  }
}
