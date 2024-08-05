import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';

import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserPageComponent } from './user-page/user-page.component';
import { PostListComponent } from './post-list/post-list.component';
import { DateFormatPipe } from './date-format.pipe';
import { AuthInterceptor } from './auth.interceptor';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    LoginComponent,
    HomeComponent,HeaderComponent,
    FooterComponent,
    CatalogComponent,
    CreateRecipeComponent,
    RegisterComponent,
    UserListComponent,
    UserPageComponent,
    PostListComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
