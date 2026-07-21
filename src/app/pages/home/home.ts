import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal([
    'Learn Angular 22',
    'Practice Angular',
    'Go to the gym',
    'Take care of Mattia'
  ])
}
