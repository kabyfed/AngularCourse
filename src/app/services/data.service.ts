import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getOneComment() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments', { params: { postId: 1 } })
  }

  postEmptyBody() {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', {})
  }

  checkPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/post');
  }
  getOnePost() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts', { headers: { 'X-Test': '1' }, responseType: 'text' })
  }

  deleteOnePost() {
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/1')
  }

  getData(): Observable<object> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }

}
