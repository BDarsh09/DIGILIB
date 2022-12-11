import { take } from 'rxjs/operators';
import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash'
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public books:any = []
  public searchText:any = ''
  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks()
    // this.books = [
    //   {
    //     "id": "6370f8f11fe870d32872fb0c",
    //     "title": "Power of Subconscious Mind",
    //     "description": "Here is the complete, original text of the millions-selling self- help guide that reveals your invisible power to attain any goal-paired with a compelling bonus work, How to Attract Money.",
    //     "publishedDate": '16-06-1978',
    //     "pageCount": 312,
    //     "bookCover": "https://m.media-amazon.com/images/I/71sBtM3Yi5L.jpg",
    //     "author": "Joseph Murphy"
    //   }
    // ]
  }

  getBooks() {
    this.bookService.getBooks().pipe(take(1)).subscribe((booksData) => {
      this.books = _.cloneDeep(booksData)
    })
  }

  selectBook(bookId) {
    this.router.navigate(['/books', bookId])
  }

}
