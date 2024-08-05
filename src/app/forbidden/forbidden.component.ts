import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  constructor(private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle('Ошибка доступа');
  }

  goBack() {
    this.router.navigateByUrl("/");
  }
}
