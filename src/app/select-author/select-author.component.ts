import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from './../services/authors.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash'
@Component({
  selector: 'app-select-author',
  templateUrl: './select-author.component.html',
  styleUrls: ['./select-author.component.css']
})
export class SelectAuthorComponent implements OnInit {
  public authorName:string = ''
  public books:Array<any> = []
  private authorId: string = ''
  constructor(private authorService: AuthorsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id')
    this.authorService.selectAuthor(this.authorId).pipe(take(1)).subscribe((selectedAuthor) => {
      this.authorName = _.cloneDeep(selectedAuthor.author)
      this.books = _.cloneDeep(selectedAuthor.books)
    })
    // this.authorName = 'Joseph Murphy'
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

}
