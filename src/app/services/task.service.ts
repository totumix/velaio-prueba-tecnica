import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask } from '../store/actions/task.actions';
import { Task } from '../models/task.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private store: Store,
    private fb: FormBuilder, 
  ) {}

  addTask(newTask: Task) {
    this.store.dispatch(addTask({ task: newTask }));
  }

  createPersonGroup(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: [null, [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  getSkills(personGroup: FormGroup): FormArray {
    return personGroup.get('skills') as FormArray;
  }
  
}
