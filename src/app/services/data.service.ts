import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import { Ibook } from "../ibook";

@Injectable()
export class DataService {
  _booksUrl: string = "http://waelsbookservice.azurewebsites.net/books";

  constructor(private _http: Http) {}

  getBooks_Old(): Array<Ibook> {
    return [
      {
        id: 1,
        title: "JavaScript - The Good Parts",
        author: "Douglas Crockford",
        isCheckedOut: true,
        rating: 3
      },
      {
        id: 2,
        title: "The Wind in the Willows",
        author: "Kenneth Grahame",
        isCheckedOut: false,
        rating: 4
      },
      {
        id: 3,
        title: "Pillars of the Earth",
        author: "Ken Follett",
        isCheckedOut: true,
        rating: 5
      },
      {
        id: 4,
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J. K. Rowling",
        isCheckedOut: false,
        rating: 5
      }
    ]; //property which will be shown in the table rows
  }

  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getBooks_Old_1(): Observable<Array<Ibook>> {
    return this._http
      .get(this._booksUrl + "/GetBooks")
      .map((response: Response) => {
        let data: Ibook[] = <Ibook[]>response.json();
        return data;
      })
      .catch(this.handleError);
  }

  search(terms: Observable<string>) {
    return terms
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.getBooks(term));
  }

  getBooks(query?: string): Observable<Ibook[]> {
    return this._http
      .get(this._booksUrl + "/GetBooks")
      .map((response: Response) => {
        let data: Ibook[] = <Ibook[]>response.json();
        if (query != null && query.length > 0) {
          data = data.filter(
            data => data.author.includes(query) || data.title.includes(query)
          );
        }
        return data;
      })
      .catch(this.handleError);
  }
  
  getBook(id: number): Observable<Ibook> {
    return this.getBooks()
    .map((books: Array<Ibook>) => books.find(b => b.id == id))
    .catch(this.handleError);
  }

  getPreviousBookId(id: number): Observable<number> {     return this.getBooks()     .map((books: Ibook[]) => { 
    return books[Math.max(0, books.findIndex(b => b.id === id) - 1)].id;     })     .catch(this.handleError);   } 
 
  getNextBookId(id: number): Observable<number> {
    return this.getBooks()
      .map((books: Ibook[]) => {
        return books[
          Math.min(books.length - 1, books.findIndex(b => b.id === id) + 1)
        ].id;
      })
      .catch(this.handleError);
  }
  updateBook(book: Ibook): Observable<void> {
    return this._http
      .put(this._booksUrl + "/modifybook", book)
      .catch(this.handleError);
  }
  deleteBook(id: number): Observable<void> {
    return this._http
      .delete(`${this._booksUrl + "/deletebook"}/${id}`)
      .catch(this.handleError);
  }

  getNextId(): Observable<number> {
    return this._http
      .get(this._booksUrl + "/GetNextId")
      .map((response: Response) => {
        let nextId: number = <number>response.json();
        return nextId;
      })
      .catch(this.handleError);
  }
}
