import { SelectBookComponent } from './select-book/select-book.component';
import { SelectAuthorComponent } from './select-author/select-author.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorsComponent } from './authors/authors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: 'authors', component: AuthorsComponent }, 
  { path: 'authors/:id', component: SelectAuthorComponent },
  { path: 'addAuthor', component: AddAuthorComponent },
  { path: 'books', component: BooksComponent }, 
  { path: 'books/:id', component: SelectBookComponent },
  { path: 'addBook', component: AddBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
