import { Component } from '@angular/core';

@Component({
  selector: 'app-factory-component',
  templateUrl: './factory-component.component.html',
  styleUrls: ['./factory-component.component.css']
})
export class FactoryComponentComponent {
  users = [{
    userId: '1',
    name: 'Alex',
    role: 'user',
  },
  {
    userId: '2',
    name: 'John',
    role: 'user',
  },
  {
    userId: '3',
    name: 'Jack',
    role: 'admin',
  }
  ];
}
