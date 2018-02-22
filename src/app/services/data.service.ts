import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
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
}
