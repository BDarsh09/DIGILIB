import { AuthorsService } from './../services/authors.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import _ from 'lodash'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  public authors:any;
  public searchText: string = '';
  constructor(public authorService: AuthorsService) { }

  ngOnInit(): void {
    this.getAuthors()
  }

  getAuthors() {
    this.authorService.getAuthors().pipe(take(1)).subscribe((authorsData) => {
      this.authors = _.cloneDeep(authorsData)
    })
  }

}
