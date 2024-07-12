import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageModule } from './page/page.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then(m => m.PageModule)
  },
  {
    path:'main',
    component:MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
