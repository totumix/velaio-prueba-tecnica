import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { selectAllTasks, selectCompletedTasks, selectPendingTasks } from '../../store/selectors/task.selectors';
import { markTaskAsCompleted, removeTask } from '../../store/actions/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
    if (filter === 'completed') {
      this.tasks$ = this.store.select(selectCompletedTasks);
    } else if (filter === 'pending') {
      this.tasks$ = this.store.select(selectPendingTasks);
    } else {
      this.tasks$ = this.store.select(selectAllTasks);
    }
  }

  completeTask(taskId: number) {
    this.store.dispatch(markTaskAsCompleted({ taskId }));
  }

  deleteTask(taskId: number) {
    this.store.dispatch(removeTask({ taskId }));
  }
}
