import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { LoginComponent } from './login/login.component';
import { AccessRoleGuard } from './access-role.guard';
import { ErrorComponent } from './error/error.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: CatalogComponent },
  { path: 'recipes/:id', component: RecipeComponent },
  { path: 'create-recipe', component: CreateRecipeComponent, canActivate: [AccessRoleGuard], data: { roles: ['user', 'admin'] } },

  { path: 'error', component: ErrorComponent },
  { path: 'error/401', component: ForbiddenComponent },

  { path: 'authorization', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },

  { path: 'admin/users', component: UserListComponent, canActivate: [AccessRoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/users/:id', component: UserPageComponent, canActivate: [AccessRoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/recipes', component: PostListComponent, canActivate: [AccessRoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/recipes/:id', component: CreateRecipeComponent, canActivate: [AccessRoleGuard], data: { roles: ['admin'] } },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
