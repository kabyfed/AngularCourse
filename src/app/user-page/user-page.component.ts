import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin.service';
import { UserDetail } from 'src/app/interfaces/user-detail';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  user: UserDetail | null = null;
  id: string = '';

  constructor(private adminService: AdminService, private route: ActivatedRoute, private title:Title) {
    this.id = this.route.snapshot.params['id']
  }


  getUser(id: string) {
    this.adminService.getUser(this.id).subscribe({
      next: (response: UserDetail) => {
        this.user = response;
      }
    })
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
  ngOnInit(): void {
    this.title.setTitle('Страница пользователя');
    this.getUser(this.id);

  }
}
