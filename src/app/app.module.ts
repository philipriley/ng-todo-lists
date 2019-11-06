import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';

const appRoutes: Routes = [
  {
    path: 'todoList/:id', component: TodoListComponent
  },
  {
    path: 'todoLists', component: TodoListsComponent
  },
  {
    path: '', redirectTo: 'todoLists', pathMatch: 'full'
  }
];

// TODO add hash routing
@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoListsComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(
    appRoutes, { enableTracing: false, useHash: true }
  )],
  bootstrap: [AppComponent]
})

export class AppModule {}
