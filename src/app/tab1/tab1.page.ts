import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Book } from '../models/book';
import { BookService } from '../services/book/book.service';
import { CreateBookPage } from '../modals/create-book/create-book.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title: string;
  books: Book[];

  constructor(public bookService: BookService, public modalController: ModalController, public alertController: AlertController) {
    this.title = 'This is a default value title';
    this.books = [];
  }

  public async createBookClicked() {
    const modal = await this.modalController.create({
      component: CreateBookPage,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.books.push(data);
  }

  public async presentDeleteBookPrompt(bookId: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to delete this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteBook(bookId);
          }
        }
      ]
    });

    await alert.present();
  }

  public async deleteBook(bookId: number) {
    try {
      await this.bookService.removeBook(bookId);

      this.books = this.books.filter(book => book.id !== bookId);
    } catch (error) {
      alert('book is not deleted');
    }
  }

  async ngOnInit() {
    try {
      this.books = await this.bookService.getBooks();
    } catch (error) {
      console.log('error', error);
    }
  }

}
