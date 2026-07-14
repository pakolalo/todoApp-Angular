import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [],
  templateUrl: './labs.html',
  styleUrl: './labs.css',
})
export class Labs {
  welcome = 'Hi!';
  tasks = ['Run in the park', 'Learn Angular', 'Do something casual'];
  name = signal('Isco');
  age = 36;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';
  person = {
    name: 'Isco',
    age: 36,
    avatar : this.img,
  }

  clickHandler() {
    alert('Hi')
  };

  inputHandler(event: Event) {
    console.log(event);
  };

  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  };

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
}
