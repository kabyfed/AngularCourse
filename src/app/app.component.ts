import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstEvoApp';

  currentRole: string = 'user';
  constructor(private dataService: DataService) { }

  toAdmin() {
    this.currentRole = 'admin'
    this.dataService.role = 'admin';
  }

  toUser() {
    this.currentRole = 'user'
    this.dataService.role = 'user';
  }
}
