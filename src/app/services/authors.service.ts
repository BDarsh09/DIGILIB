import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public authors:any = []
  constructor(public http: HttpClient) { }

  public getAuthors(): Observable<any> {
    if (this.authors.length) {
      return of(this.authors)
    } else {
      return this.http.get('api/authors').pipe(switchMap((response: any) => {
        if (response) {
          this.authors = this.base64ToJson(response.data)
          return of(this.authors)
        }
      }), catchError((error) => {
        return throwError(error)
      }));
    }
  }

  public addAuthor(authorName): Observable<any> {
    let sendJSON:any = {}
    if (authorName) {
      sendJSON.authorName = authorName
    }
    return this.http.post('api/authors', sendJSON).pipe(switchMap((response: any) => {
      if (response) {
        return of(response)
      }
    }), catchError((error) => {
      return throwError(error)
    }))
  }

  public base64ToJson(base64String) {
    let jsonObj = JSON.parse(atob(base64String))
    return jsonObj
  }
}
