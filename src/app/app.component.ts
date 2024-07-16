import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig} from '@ngx-formly/core';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  form = new FormGroup({});
  model = { email: '', password: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Введите ваш email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        placeholder: 'Введите пароль',
        required: true,
      },
    },
  ];

  submit() {
    if (this.form.valid) {
      console.log('Form Data:', this.model);
      Notiflix.Notify.success('Форма успешно отправлена!');
    } else {
      Notiflix.Notify.failure('Пожалуйста, заполните все обязательные поля!');
    }
  }
}
