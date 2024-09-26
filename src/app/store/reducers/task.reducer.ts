import { createReducer, on } from '@ngrx/store';
import { addTask, markTaskAsCompleted, removeTask, filterTasks } from '../actions/task.actions';
import { Task } from '../../models/task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(markTaskAsCompleted, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  })),
  on(removeTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  on(filterTasks, (state, { completed }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.completed === completed)
  }))
);
