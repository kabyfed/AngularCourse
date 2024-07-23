import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  getPosts() {
    this.dataService.getAllPosts().subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  getComment() {
    this.dataService.getOneComment().subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  postBody() {
    this.dataService.postEmptyBody().subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  checkPost() {
    this.dataService.checkPosts().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          console.log('Страница не найдена');
        } else {
          console.error('Произошла ошибка:', err.message);
        }
      }
    })
  }
  getPost() {
    this.dataService.getOnePost().subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  deletePost() {
    this.dataService.deleteOnePost().subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  post: any;
  getResolverPost() {
    this.route.data.subscribe(data => {
      this.post = data['post'];
    });
  }
}
