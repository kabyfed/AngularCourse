import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Post } from '../interfaces/post';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { FavoritesService } from '../services/favorites.service';
import { Notify } from 'notiflix';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { interval, Subscription } from 'rxjs';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private recipesData: RecipeService,
    private title: Title,
    private authService: AuthService,
    private meta: Meta,
    private favoritesService: FavoritesService
  ) {
    this.getPost();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.displayedBestRecipes.length - 1;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.displayedBestRecipes.length - 1) ? this.currentSlide + 1 : 0;
    this.updateSlidePosition();
  }
  updateSlidePosition() {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    if (sliderWrapper) {
      sliderWrapper.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }

  currentSlide = 0;
  slideInterval$!: Subscription;
  dismissedStatus = false;

  emailCheck = {
    email: null
  };

  recipes: Post[] = [];
  displayedBestRecipes: Post[] = [];
  displayedTryRecipes: Post[] = [];
  maxBestDisplayed = 3;
  tryDisplayed = 4;
  shownBestRecipes: Post[] = [];

  getPost() {
    this.recipesData.getPosts().subscribe({
      next: (response: Post[]) => {
        this.recipes = response;
        this.shownBestRecipes = this.getRandomRecipes(this.maxBestDisplayed);
        this.displayedBestRecipes = this.shownBestRecipes;
        this.displayedTryRecipes = this.getRandomRecipes(this.tryDisplayed);
      }
    });
  }

  getRandomRecipes(count: number) {
    const shuffled = this.recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  subscribeEmail() {
    Notify.success('Вы подписаны на рассылку :)');
  }

  showMoreRecipes() {
    this.maxBestDisplayed += 3;
    const newRecipes = this.getAdditionalRecipes(3);
    this.shownBestRecipes = this.shownBestRecipes.concat(newRecipes);
    this.displayedBestRecipes = this.shownBestRecipes;
  }

  getAdditionalRecipes(count: number): Post[] {
    const allRecipes = this.recipes.filter(recipe => !this.shownBestRecipes.some(shownRecipe => shownRecipe.id === recipe.id));
    const additionalRecipes = allRecipes.slice(0, count);
    return additionalRecipes;
  }

  isFavorite(recipeId: string): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  toggleFavorite(recipeId: string): void {
    
    this.favoritesService.toggleFavorite(recipeId);
  }

  dismissNotification() {
    this.dismissedStatus = true;
  }

  ngOnInit(): void {
    this.title.setTitle('Главная страница');
    this.meta.updateTag({ property: 'og:title', content: 'Foodie: Главная' });
    this.meta.updateTag({ property: 'og:desc', content: 'Сборник кулинарных рецептов, для всей семьи' });

    this.slideInterval$ = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  ngOnDestroy() {
    if (this.slideInterval$) {
      this.slideInterval$.unsubscribe();
    }
  }
}
