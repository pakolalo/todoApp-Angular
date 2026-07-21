import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model'

@Component({
  selector: 'app-home',
  imports: [],
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

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    input.value = '';
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
}
