import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { immutableSplice } from 'src/utils/array';
import { TodoService } from 'src/app/services/todo.service';
import { TodoList } from 'src/app/models/TodoList';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild('todoInput', { static: false }) todoInput: ElementRef<
    HTMLInputElement
  >;
  private todoList: TodoList;
  private subscriptions = new Subscription();
  private showCompleted = false;

  constructor(
    private todoService: TodoService,
    public route: ActivatedRoute,
    private router: Router,
  ) {}

  get todos(): Todo[] {
    return this.todoList.getTodos();
  }

  addTodo(title: string): void {
    if (!title) {
      return;
    }

    this.todoService.addToList(this.todoList.id, Todo.create(title));
    this.todoInput.nativeElement.value = '';
  }

  updateTodo(todo: Todo) {
    this.todoList.updateTodo(todo);
  }

  toggleShowCompleted(state: boolean) {
    this.router.navigate([],
      {
        queryParams: { showCompleted: state},
        queryParamsHandling: 'merge'
      }
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.todoService.getLists.subscribe(todoLists => {
        this.route.params.subscribe(val => {
          this.todoList = todoLists.find(
            todoList => todoList.id === val.id
          );
          this.showCompleted = val.showCompleted;
        });
      }),
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
