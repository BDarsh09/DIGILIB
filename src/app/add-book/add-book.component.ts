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
  constructor(private authorService: AuthorsService) { }

  ngOnInit(): void {
    this.getAuthors()
  }

  getAuthors() {
    this.authorService.getAuthors().pipe(take(1)).subscribe((authorsData) => {
      this.authors = _.cloneDeep(authorsData)
    })
  }

  onSubmit(bookData: NgForm) {

  }

  onChangeAuthor(author) {
    this.authorName = author.target.value
  }

  

}
