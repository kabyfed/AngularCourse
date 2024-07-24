import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { ToDo } from './interfaces/to-do';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstEvoApp';

  constructor(private dataService: DataService) { }

  toDoList!: ToDo;

  getList() {
    this.dataService.getToDoList().subscribe({
      next: (response: ToDo) => {
        this.toDoList = response;
        console.log(this.toDoList);
      }
    })
  }
}
