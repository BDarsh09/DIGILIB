import { ToastrService } from 'ngx-toastr';
import { AuthorsService } from './../services/authors.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import _ from 'lodash'
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  public authors:any;
  public searchText: string = '';
  public spinnerEnabled:boolean = false
  constructor(private authorService: AuthorsService, private router: Router, private toastrService: ToastrService) { 
    
  }

  ngOnInit(): void {
    // this.authors = [
    //   {
    //     id: "635646d2f4b95ce5baa2b303",
    //     name: 'Joseph Murphy'
    //   }, {
    //     id: "635e69def9931cc5b96222d2",
    //     name: 'Darshil Bavishi'
    //   }, {
    //     id: "635e69def9931cc5b96222d3",
    //     name: 'Maitree Bavishi'
    //   }
    // ]
    this.getAuthors()
  }

  getAuthors() {
    this.spinnerEnabled = true
    this.authorService.getAuthors().pipe(take(1)).subscribe((authorsData) => {
      this.spinnerEnabled = false
      this.authors = _.cloneDeep(authorsData)
    })
  }

  viewAuthor(authorId) {
    this.router.navigate(['/authors', authorId])
  }

  editAuthor(author) {
    this.router.navigate(['/addAuthor'], { state: { 'author': author } })
  }

  deleteAuthor(authorId) {
    let message = 'Are you sure you want to delete?'
    if (confirm(message) === true) {
      this.authorService.deleteAuthor(authorId).pipe(take(1)).subscribe((response) => {
        if (response) {
          this.toastrService.info(response.message, '', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-left'
          });
          this.getAuthors();
        }
      })
    }
  }
}
