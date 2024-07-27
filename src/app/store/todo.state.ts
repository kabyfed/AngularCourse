import { Action, Selector, State, StateContext } from "@ngxs/store";
import { RemoveTodo, todoInterface } from './model/todo.model'
import { Injectable } from "@angular/core";
import { AddTodo } from './model/todo.model';

@State<todoInterface>({
  name: 'todo',
  defaults: {
    todos: []
  }
})

@Injectable()
export class TodoState {
  @Selector()
  static getTodos(state: todoInterface) {
    return state.todos;
  }

  @Action(AddTodo)
  add(ctx: StateContext<todoInterface>, action: AddTodo) {
    const state = ctx.getState();
    ctx.patchState({
      todos: [...state.todos, action.payload]
    });
  }

  @Action(RemoveTodo)
  remove(ctx: StateContext<todoInterface>, action: RemoveTodo) {
    const state = ctx.getState();
    const todos = state.todos.filter((todo, index) => index !== action.payload);
    ctx.patchState({ todos });
  }
}
