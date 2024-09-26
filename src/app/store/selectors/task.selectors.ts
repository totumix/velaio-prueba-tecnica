import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('taskState');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => task.completed)
);

export const selectPendingTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => !task.completed)
);
