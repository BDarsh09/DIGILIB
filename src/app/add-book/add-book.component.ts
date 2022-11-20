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

  public title: string = ''
  public publishedDate: Date
  public pageCount: Number
  public authorName: String = ''
  public description: String = ''
  public authors:any = []
  public fileName:any = ''
  public bookCover:String = ''
  // private formData:any
  constructor(private authorService: AuthorsService, private bookService: BooksService) { }

  ngOnInit(): void {
    this.getAuthors()
  }

  getAuthors() {
    this.authorService.getAuthors().pipe(take(1)).subscribe((authorsData) => {
      this.authors = _.cloneDeep(authorsData)
    })
  }

  onSubmit(bookData: NgForm) {
    let sendJSON:any = {
      'title': this.title,
      'publishedDate': this.publishedDate,
      'pageCount': this.pageCount,
      'author': this.authorName,
      'description': this.description,
      'bookCover': this.bookCover
    }
    // Object.entries(sendJSON).map(([key, value]) =>
    //   this.formData.append(key, value)
    // );
    // for (var pair of this.formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    this.bookService.addBook(sendJSON).pipe(take(1)).subscribe((response) => {
      if (response) {
        console.log(response)
      }
    })
  }

  onChangeAuthor(author) {
    this.authorName = author.target.value
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
