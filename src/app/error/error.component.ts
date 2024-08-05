import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle('Страница не найдена');
  }

  goBack() {
    this.router.navigateByUrl("/");
  }
}
