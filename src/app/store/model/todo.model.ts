export interface todoInterface {
  todos: string[];
}

export class AddTodo {
  static readonly type = '[TODO] Add';
  constructor(public payload: string) { }
}

export class RemoveTodo {
  static readonly type = '[TODO] Remove';
  constructor(public payload: number) { }
}
