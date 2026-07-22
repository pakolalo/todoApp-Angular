import { Component, computed, signal } from '@angular/core';
import { Task } from './../../models/task.model'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Create project',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Learn Angular 22',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Practice Angular',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Go to the gym',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Take care of Mattia',
      completed: false,
    },
  ]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    } if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks;
  });

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  changeHandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value !==''){
        this.addTask(value);
        this.newTaskControl.setValue('');
      }
    }
  };

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  };

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  };

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          };
        };
        return task;
      });
    });
  };

  updateTaskEditingMode(index: Number) {
    this.tasks.update(prevState => {
      return prevState.map((task, posotion) => {
        if (posotion === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  };

  updateTaskText(index: Number, event: Event) {
    const input = event.target as HTMLInputElement
    this.tasks.update(prevState => {
      return prevState.map((task, posotion) => {
        if (posotion === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  };

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
