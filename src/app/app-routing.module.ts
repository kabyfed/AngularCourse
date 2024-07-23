import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PreFetchingResolver } from './pre-fetching.resolver';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'post', component: PostComponent, resolve: { post: PreFetchingResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
