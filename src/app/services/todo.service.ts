import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TodoList } from '../models/TodoList';
import { Todo } from '../models/Todo';
import { immutableSplice } from 'src/utils/array';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private observableArray = new BehaviorSubject<Array<TodoList>>([]);

   addList(todoList: TodoList) {
     this.observableArray.asObservable().pipe(take(1)).subscribe(lists => {
       this.observableArray.next([...lists, todoList]);
     });
   }

   get getLists(): Observable<Array<TodoList>> {
     return this.observableArray;
   }

   addToList(id: string, todo: Todo) {
    this.observableArray.asObservable().pipe(take(1)).subscribe(lists => {
      const index = lists.findIndex(l => l.id === id);
      const list = lists[index];
      list.updateTodo(todo);

      const updatedLists = immutableSplice(lists, index, 1, lists[index]);
      this.observableArray.next(updatedLists);
    })
   }
}
