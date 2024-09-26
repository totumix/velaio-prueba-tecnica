import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TaskService } from '../../services/task.service'; // Servicio de tareas
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto

@Component({
  selector: 'app-task-form',
  standalone: true, // Declaramos que es standalone
  imports: [CommonModule, ReactiveFormsModule], // Importamos los módulos necesarios
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public taskService: TaskService, 
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      persons: this.fb.array([])
    });
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson(): void {
    const personGroup = this.taskService.createPersonGroup();
    this.persons.push(personGroup);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  getSkills(personIndex: number): FormArray {
    return this.taskService.getSkills(this.persons.at(personIndex) as FormGroup);
  }

  addSkill(personIndex: number): void {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: new Date().getTime(),
        title: this.taskForm.value.title,
        completed: false,
        persons: this.taskForm.value.persons
      };

      this.taskService.addTask(newTask);
      this.taskForm.reset();
      this.router.navigate(['/tasks']); 
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
