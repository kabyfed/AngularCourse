import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  list: number;
  enable: boolean ;

  constructor(private route: ActivatedRoute) {
    this.list = route.snapshot.queryParams['list'];
    this.enable = route.snapshot.queryParams['enable'];
  }

}
