import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [],
  templateUrl: './labs.html',
  styleUrl: './labs.css',
})
export class Labs {
  welcome = 'Hi!';
  tasks = ['Run in the park', 'Learn Angular', 'Do something casual'];
}
