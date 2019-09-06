export class Todo {
  public static create(title: string): Todo {
    return new Todo(title, false, new Date());
  }

  protected constructor(
    public readonly title: string,
    public readonly completed: boolean,
    public readonly created: Date
  ) {}

  toggleCompleted(): Todo {
    return new Todo(this.title, !this.completed, this.created);
  }
}
