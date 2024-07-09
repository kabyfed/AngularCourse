import { Component } from '@angular/core';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.css']
})
export class ComponentBComponent {
  counter = 0;

  changeCount(type:boolean){
    type ? this.counter++ : this.counter-- ;
  }
}
