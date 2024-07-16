import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor() { }

  users: User[] = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    }
  ];

}
