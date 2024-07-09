import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstEvoApp';
  obj = [
    {
      name:'Jack',
      age: 23
    },
    {
      name:'John',
      age: 20
    },
    {
      name:'Bill',
      age: 26
    },
  ];
  now = new Date();

  testNumber = 10;
}
