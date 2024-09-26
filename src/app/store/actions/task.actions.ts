import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const markTaskAsCompleted = createAction(
  '[Task] Mark Task As Completed',
  props<{ taskId: number }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ taskId: number }>()
);

export const filterTasks = createAction(
  '[Task] Filter Tasks',
  props<{ completed: boolean }>()
);
