import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  posts: Post[] = [];
  getPosts() {
    this.dataService.getPostList().subscribe({
      next: (response: Post[]) => {
        this.posts = response
      }
    })
  }
}
