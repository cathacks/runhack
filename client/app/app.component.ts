import { Component } from '@angular/core';

export class Runner {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{runner.name}} details!</h2>
    <div><label>id: </label>{{runner.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="runner.name" placeholder="name">
    </div>
    `
})

export class AppComponent {
  title = 'RunHack';
  runner: Runner = {
    id: 1,
    name: 'Gary'
  };
}
