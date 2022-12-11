import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import _ from 'lodash'
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  public authorName:string = ''
  public author:any = {}
  public editAuthor:boolean = false
  constructor(public authorService: AuthorsService, public router: Router, public toastrService: ToastrService) { 
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.author) {
      this.author = _.cloneDeep(this.router.getCurrentNavigation().extras.state.author)
      this.authorName = _.cloneDeep(this.router.getCurrentNavigation().extras.state.author.name)
      this.editAuthor = true
    }
  }

  ngOnInit(): void {
  }

  onValidate() {
    // console.log(this.authorName)
  }

  onSubmit(authorData: NgForm){
    if (this.editAuthor === true && this.author && this.author._id) {
      this.author.name = _.cloneDeep(this.authorName)
      this.authorService.updateAuthor(this.author).pipe(take(1)).subscribe((response) => {
        if (response) {
          this.toastrService.info(response.message, '', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-left'
          });
          this.router.navigate(['/authors'])
        }
      })
    } else {
      this.authorService.addAuthor(this.authorName).pipe(take(1)).subscribe((response) => {
        if (response) {
          this.toastrService.info(response.message, '', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-left'
          });
          this.router.navigate(['/authors'])
        }
      })
    }
  }

}
