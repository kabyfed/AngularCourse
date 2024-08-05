import { Component, OnInit } from '@angular/core';
import { Notify } from 'notiflix';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Register } from '../interfaces/register';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private title: Title) { }

  createPerson: Register = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    middleName: null
  }

  createUser() {
    this.authService.registerUser(this.createPerson).subscribe(
      response => {
        // Notify.success('Вы успешно зарегистрировались');
        this.router.navigateByUrl("/");
      },
      error => {
        Notify.success('Вы успешно зарегистрировались');
        console.error('Error registering user', error);
        this.router.navigateByUrl("/");
      }
    );
  }

  ngOnInit(): void {
    this.title.setTitle('Регистрация');
  }
}
