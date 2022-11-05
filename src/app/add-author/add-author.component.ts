import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  public authorName:string = ''
  constructor(public authorService: AuthorsService) { }

  ngOnInit(): void {
  }

  onValidate() {
    // console.log(this.authorName)
  }

  onSubmit(authorData: NgForm){
    this.authorService.addAuthor(this.authorName).pipe(take(1)).subscribe((response) => {
      if (response) {
        console.log(response)
      }
    })
  }

}
