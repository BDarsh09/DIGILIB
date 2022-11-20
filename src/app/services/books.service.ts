import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public books:any = []
  constructor(public http: HttpClient) { }

  public getBooks(): Observable<any> {
    if (this.books && this.books.length) {
      return of(this.books)
    } else {
      return this.http.get('api/books').pipe(switchMap((response: any) => {
        if (response) {
          // this.authors = this.base64ToJson(response.data)
          this.books = response
          return of(this.books)
        }
      }), catchError((error) => {
        return throwError(error)
      }));
    }
  }

  public addBook(bookData): Observable<any> {
    console.log(bookData)
    return this.http.post('api/books', bookData).pipe(switchMap((response: any) => {
      if (response) {
        return of(response)
      }
    }), catchError((error) => {
      return throwError(error)
    }))
  }

  public selectBook(bookId): Observable<any> {
    return this.http.get("api/books", { params: { "bookId": bookId } }).pipe(map((response) => {
      return response
    }))
  } 

}
