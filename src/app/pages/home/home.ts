import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { Task } from './../../models/task.model'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  /** Reactive list of tasks. Serves as the component's source of truth. */
  tasks = signal<Task[]>([]);

  /** Active filter for task display. */
  filter = signal<'all' | 'pending' | 'completed'>('all');

  /**
  * Derived task list based on the active filter.
  * Automatically recomputes whenever `tasks` or `filter` changes.
  */
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

  /**
  * Form control for the new task input field.
  * Non-nullable and requires a non-empty value.
  */
  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  /** Current context injector, used for operations outside the injection tree. */
  injector = inject(Injector);

  /**
  * Lifecycle hook called on component initialization.
  * Restores persisted tasks from localStorage and starts the persistence tracker.
  */
  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTask();
  };

  /**
  * Registers a reactive effect that persists the task list to localStorage
  * whenever the `tasks` signal changes.
  */
  trackTask() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }


  /**
  * Handles the new task input submission.
  * Validates the control, trims the value, and delegates to `addTask` if non-empty.
  * Resets the input field after a successful addition.
  */
  changeHandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value !==''){
        this.addTask(value);
        this.newTaskControl.setValue('');
      }
    }
  };

  /**
  * Creates a new task and appends it to the task list.
  * @param title - The display text for the new task.
  */
  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  };

  /**
  * Removes a task from the list by its position.
  * @param index - The index of the task to remove.
  */
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  };

  /** Removes all tasks marked as completed from the list. */
  deleteCompleted() {
    this.tasks.update((tasks) => tasks.filter((task) => !task.completed));
  }

  /**
  * Toggles the completed state of a task.
  * @param index - The index of the task to update.
  */
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

  /**
  * Sets a task to editing mode and disables editing on all others.
  * @param index - The index of the task to set as editable.
  */
  updateTaskEditingMode(index: Number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
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

  /**
  * Updates the title of a task from an input event and exits editing mode.
  * @param index - The index of the task to update.
  * @param event - The DOM event from the input element.
  */
  updateTaskText(index: Number, event: Event) {
    const input = event.target as HTMLInputElement
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
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

  /**
  * Updates the active filter for the task list view.
  * @param filter - The filter to apply: 'all', 'pending', or 'completed'.
  */
  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
