import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../interfaces/to-do';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getToDoList(): Observable<ToDo> {
    return this.http.get<ToDo>('https://jsonplaceholder.typicode.com/todos')
  }
}
