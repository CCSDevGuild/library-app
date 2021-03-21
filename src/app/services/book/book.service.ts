import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  URL = 'http://localhost:8080/books';

  constructor(private http: HttpClient) { }

  public async getBooks(): Promise<Book[]> {
    const books = await this.http.get(this.URL).toPromise() as Book[];

    return books;
  }

  public async createBook(book: Book): Promise<Book> {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);

    if (book.poster) {
      const posterFile = await fetch(book.poster);
      const blob = await posterFile.blob();
      formData.append('poster', blob);
    }

    return await this.http.post(this.URL, formData).toPromise() as Book;
  }

  public async removeBook(bookId: number) {
    await this.http.delete(`${this.URL}/${bookId}`).toPromise();

    return true;
  }

}
