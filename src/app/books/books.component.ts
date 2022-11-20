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
  }

  getBooks() {
    this.bookService.getBooks().pipe(take(1)).subscribe((booksData) => {
      this.books = _.cloneDeep(booksData)
    })
  }

  selectBook(bookId) {
    this.router.navigate(['/books', bookId])
    // this.bookService.selectBook(bookId).pipe(take(1)).subscribe((selectedBook) => {
    //   console.log(selectedBook)
    // })
  }

}
