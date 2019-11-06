import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('todoListsInput', { static: false }) todoListsInput: ElementRef<
    HTMLInputElement
  >;

  private subscriptions = new Subscription();
  private lists: TodoList[] = [];

  constructor(private todoService: TodoService) {}

  get todoLists(): TodoList[] {
    return this.lists;
  }

  addList(title: string) {
    if (!title) {
      return;
    }
    this.todoService.addList(TodoList.create(title));
    this.todoListsInput.nativeElement.value = '';
  }

  ngOnInit() {
    this.subscriptions.add(
      this.todoService.getLists.subscribe(lists => {
        this.lists = lists;
      }),
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
