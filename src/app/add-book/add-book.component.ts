import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BooksService } from './../services/books.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import _ from 'lodash'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public authorName: String = ''
  public authors:any = []
  public book:any = {}
  public editBook:boolean = false
  
  constructor(private authorService: AuthorsService, 
    private bookService: BooksService, 
    private router: Router, 
    public datePipe: DatePipe, 
    private toastrService: ToastrService) 
    { 
      if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state){
        this.book = _.cloneDeep(this.router.getCurrentNavigation().extras.state.book)
        this.book.publishedDate = this.datePipe.transform(this.book.publishedDate, 'yyyy-MM-dd')
        this.editBook = true
      }
    }

  ngOnInit(): void {
    // this.authors = [{
    //     name: 'Joseph Murphy'
    //   }, {
    //     name: 'Darshil Bavishi'
    //   }, {
    //     name: 'Maitree Bavishi'
    //   }]
    this.getAuthors()
  }

  getAuthors() {
    this.authorService.getAuthors().pipe(take(1)).subscribe((authorsData) => {
      this.authors = _.cloneDeep(authorsData)
    })
  }

  onSubmit(bookData: NgForm) {
    // Object.entries(sendJSON).map(([key, value]) =>
    //   this.formData.append(key, value)
    // );
    // for (var pair of this.formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    if(this.editBook === true && this.book && this.book.id) {
      this.bookService.updateBook(this.book).pipe(take(1)).subscribe((response) => {
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
    }else {
      this.bookService.addBook(this.book).pipe(take(1)).subscribe((response) => {
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
    console.log(this.book)
  }

  onChangeAuthor(author) {
    this.book.authorName = author.target.value
  }

  onDismiss() {
    this.book = {}
    this.editBook = false
  }

  // onFileSelected(event) {
  //   const file:File = event.target.files[0]
  //   console.log(file)
  //   if (file) {
  //     this.fileName = file.name
  //     this.formData = new FormData()
  //     this.formData.append('bookCover', file)
  //     console.log('fileData' + this.formData)

  //   }
  // }

}
