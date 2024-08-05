import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import * as Notiflix from 'notiflix';
import { User } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private adminService: AdminService, private title: Title) { }
  users: User[] = [];

  getUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
      }
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Пользователи');
    this.getUsers();
  }

  deleteUser(userId: string, userName:string) {
    Notiflix.Confirm.show(
      'Удалить этого пользователя?',
      `Вы хотите удалить пользователя ${userName}. Действие нельзя отменить`,
      'Закрыть',
      'Удалить',
      () => { },
      () => {
        Notiflix.Notify.success('Пользователь был удален');
        this.adminService.deleteUser(userId).subscribe({
        });
      },
      {
        width: '512px',
        fontFamily: 'Inter',
        borderRadius: '8px',
        titleColor: 'rgba(17, 24, 39, 1)',
        okButtonBackground: '#ffffff',
        okButtonColor: 'rgba(55, 65, 81, 1)',
        cancelButtonBackground: 'rgba(221, 0, 53, 1)',
        cancelButtonColor: 'rgba(255, 255, 255, 1)',
      }
    );
  }

}
