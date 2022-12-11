import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public authors:any = []
  constructor(public http: HttpClient) { }

  public getAuthors(): Observable<any> {
    return this.http.get('api/authors').pipe(switchMap((response: any) => {
      if (response) {
        this.authors = this.base64ToJson(response.data)
        return of(this.authors)
      }
    }), catchError((error) => {
      return throwError(error)
    }));
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

  public selectAuthor(authorId): Observable<any> {
    return this.http.get(`api/authors/${authorId}`).pipe(switchMap((response) => {
      return of(response)
    }), catchError((error) => {
      return throwError(error)
    })) 
  }

  public updateAuthor(author): Observable<any> {
    let sendJSON: any = {}
    if (author.name) {
      sendJSON.authorName = author.name
    }
    return this.http.put(`api/authors/${author._id}`, sendJSON).pipe(switchMap((response) => {
      return of(response)
    }), catchError((error) => {
      return throwError(error)
    }))
  }

  public deleteAuthor(authorId): Observable<any> {
    return this.http.delete(`api/authors/${authorId}`).pipe(switchMap((response) => {
      return of(response)
    }), catchError((error) => {
      return throwError(error)
    }))
  }

  public base64ToJson(base64String) {
    let jsonObj = JSON.parse(atob(base64String))
    return jsonObj
  }
}
