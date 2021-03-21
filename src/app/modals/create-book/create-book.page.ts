import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit {
  bookPayload: Book;

  constructor(
    public bookService: BookService,
    public modalController: ModalController,
    public photoService: PhotoService,
  ) {
    console.log('Payload', this.bookPayload);
    this.bookPayload = new Book();
    console.log('bookPayload after', this.bookPayload);
  }

  ngOnInit() {
  }

  public async takePhoto() {

    try {
      const photoURL = await this.photoService.takePhoto();
      console.log('photoURL', photoURL);
      this.bookPayload.poster = photoURL.webPath;
    } catch (error) {
      console.log('error', error);
    }

  }

  public async sumbitBook() {
    try {
      const book = await this.bookService.createBook(this.bookPayload);
      this.modalController.dismiss(book);
      console.log('book', book);
    } catch (error) {
      // Show Toast
      console.log('error', error);
    }
  }

}
