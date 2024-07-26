import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post!: Post;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getPostList().subscribe(posts => {
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        this.post = foundPost;
      } 
    });
  }
}
