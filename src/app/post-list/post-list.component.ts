import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Post } from 'src/app/interfaces/post';
import { AdminService } from 'src/app/services/admin.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  constructor(
    private recipesData: RecipeService,
    private adminService: AdminService,
    private router: Router
  ) { }

  recipes: Post[] = [];

  getPosts() {
    this.recipesData.getPosts().subscribe({
      next: (response: Post[]) => {
        this.recipes = response;
      }
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  deleteRecipe(recipeId: string) {
    this.router.navigateByUrl('/recipes/' + recipeId).then(() => {
      this.openDeleteConfirmation();
    });
    this.adminService.deleteRecipe(recipeId).subscribe({});

  }

  openDeleteConfirmation() {
    Notiflix.Confirm.show(
      'Удалить этот рецепт?',
      `Вы хотите удалить этот рецепт`,
      'Закрыть',
      'Удалить',
      () => { },
      () => {
        Notiflix.Notify.success('Рецепт был удален');
      },
      {
        width: '512px',
        fontFamily: 'Inter',
        borderRadius: '8px',
        titleColor: 'rgba(17, 24, 39, 1)',
        okButtonBackground: '#ffffff',
        okButtonColor: 'rgba(55, 65, 81, 1)',
        cancelButtonBackground: 'rgba(221, 0, 53, 1)',
        cancelButtonColor: 'rgba(255, 255, 255, 1)',
      }
    );
  }

  editRecipe(recipeId: string) {
    this.router.navigate([`/admin/recipes/${recipeId}`]);
  }
}
