import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash'

@Component({
  selector: 'app-select-book',
  templateUrl: './select-book.component.html',
  styleUrls: ['./select-book.component.css']
})
export class SelectBookComponent implements OnInit {
  
  public book:any
  private bookId: string = ''
  public spinnerEnabled:boolean = false
  constructor(private router: Router, private route: ActivatedRoute, private bookService: BooksService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')
    this.spinnerEnabled = true
    this.bookService.selectBook(this.bookId).pipe(take(1)).subscribe((bookData) => {
      if (bookData) {
        this.spinnerEnabled = false
        this.book = _.cloneDeep(bookData)
      }
    }) 
  }

  editBook() {
    this.router.navigate(['/addBook'], {state: {'book': this.book}})
  }

  deleteBook() {
    let message = 'Are you sure you want to delete?'
    if(confirm(message) === true) {
      this.bookService.deleteBook(this.book.id).pipe(take(1)).subscribe((response) => {
        if (response) {
          this.toastrService.info(response.message, '', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-left'
          });
          this.router.navigate(['/books'])
        }
      }) 
    }
  }

  downloadBook() {}
  
}
