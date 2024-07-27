import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddTodo, RemoveTodo } from './store/model/todo.model';
import { TodoState } from './store/todo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Select(TodoState.getTodos) todos$!: Observable<string[]>;
  todos: string[] = [];
  newTodo: string = '';

  constructor(private store: Store) {
    this.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo() {
    this.store.dispatch(new AddTodo(this.newTodo));
    this.newTodo = '';
  }

  removeTodo(index: number) {
    this.store.dispatch(new RemoveTodo(index));
  }
}
