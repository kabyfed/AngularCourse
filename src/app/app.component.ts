import { Component } from '@angular/core';
import { Book } from './interfaces/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstEvoApp';

  books: Book[] = [
    {
      name: "Война и Мир",
      author: "Лев Толстой"
    },
    {
      name: "Капитанская дочка",
      author: "Александр Пушкин"
    }
  ]
  createBook = {
    name: null,
    author: null
  }

  addBook() {
    this.books.push({
      name: this.createBook.name,
      author: this.createBook.author
    })
  }

}
