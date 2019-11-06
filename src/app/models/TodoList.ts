import { Todo } from './Todo';
import { v4 as uuid } from 'uuid';
import { immutableSplice } from 'src/utils/array';

export class TodoList {

  public static create(title: string): TodoList {
    return new TodoList(uuid(), title, new Date(), []);
  }

  protected constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly created: Date,
    private todos: Todo[]
  ) {}

  getTodos() {
    return this.todos;
  }

  /**
   * Moved from todo-list.component.ts
   * @param todo The Todo to be added to the TodoList
   */
  updateTodo(todo: Todo) {
    this.todos = immutableSplice(
      this.todos,
      this.todos.findIndex(t => t.created === todo.created),
      1,
      todo
    );
  }

  /**
   * Returns true if any uncompleted Todos are found in todoList
   */
  isCompleted(): boolean {
    const uncompleted = this.todos.some(todo => !todo.completed);
    return !this.todos.some(todo => !todo.completed);
  }

  /**
   * Returns true if there are any todos present
   */
  hasTodos(): boolean {
    return !!this.todos.length;
  }

}
