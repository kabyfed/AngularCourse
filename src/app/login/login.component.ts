import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import { Notify } from 'notiflix';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private title: Title) { }

  loginPerson: Login = {
    username: null,
    password: null
  }
  fastJwt: boolean = false;

  signUser() {
    this.authService.loginUser(this.loginPerson, this.fastJwt).subscribe(
      response => {
        Notify.success('Вы успешно Авторизовались');
        this.router.navigateByUrl("/");
      },
      error => {
        if (error.status === 400) {
          Notify.failure('Проверьте корректность полей');
        } else if (error.status === 401) {
          Notify.failure('Неправильный пароль');
        } else if (error.status === 403) {
          Notify.failure('Пользователь заблокирован');
        } else if (error.status === 404) {
          Notify.failure('Пользователь не найден');
        } else {
          Notify.failure('Произошла неизвестная ошибка');
        }
        console.error('Error logging in', error);
      }
    );
  }

  ngOnInit(): void {
    this.title.setTitle('Авторизация');
  }
}
