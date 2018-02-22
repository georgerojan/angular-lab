import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ibook } from "../Ibook";
import { MatSnackBar, MatDialog } from "@angular/material";
import { DataService } from "../services/data.service";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { BookDetailComponent } from "../book-detail/book-detail.component";

@Component({
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.css"]
})
export class CollectionComponent implements OnInit, OnDestroy {
  pageTitle: string; //property which will be shown in the panel header
  books: Array<Ibook> = null;
  showOperatingHours: boolean = false; //property for message visibility and toggle button text
  openingTime: Date; //property that shows the opening time
  closingTime: Date; //property that shows the closing time

  searchTerm$: Subject<string> = new Subject<string>();

  constructor(
    private _snackBar: MatSnackBar,
    private _dataService: DataService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.openingTime = new Date();
    this.openingTime.setHours(10, 0);
    this.closingTime = new Date();
    this.closingTime.setHours(15, 0);
  }

  ngOnInit() {
    console.log("Listing Initalized");
    this.getBooks();
    this._dataService.search(this.searchTerm$).subscribe(books => {
      this.books = books;
    });
  }

  ngOnDestroy() {
    console.log("Listing Destroyed");
  }

  updateMessage(message: string, type: string): void {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, "DISMISS", {
        duration: 3000
      });
    }
  }

  getBooks(): void {
    this._dataService
      .getBooks()
      .subscribe(
        books => (this.books = books),
        error => this.updateMessage(<any>error, "ERROR")
      );
  }

  onRatingUpdate(book: Ibook): void {
    this.updateBook(book);
    this.updateMessage(book.title, "Rating has been updated");
  }

  updateBook(book: Ibook): void {
    this._dataService.updateBook(book).subscribe(
      () => {
        this._snackBar.open(`"${book.title}" has been updated!`, "DISMISS", {
          duration: 3000
        });
      },
      error => this.updateMessage(<any>error, "ERROR")
    );
  }

  openDialog(bookId: number): void {
    let config = { width: "650px", height: "400x", position: { top: "50px" } };
    let dialogRef = this._dialog.open(BookDetailComponent, config);
    dialogRef.componentInstance.bookId = bookId;
    dialogRef.afterClosed().subscribe(res => {
      this.getBooks();
    });
  }

  openRoute(bookId: number): void {
    this._router.navigate(["/collection", bookId]);
  }

  delete(book: Ibook) {
    this._dataService.deleteBook(book.id).subscribe(
      () => {
        this.getBooks();
        this._snackBar.open(`"${book.title}" has been deleted!`, "DISMISS", {
          duration: 3000
        });
      },
      error => this.updateMessage(<any>error, "ERROR")
    );
  }

  findRatingColor(colorValue: number): string {
    if (colorValue <= 2) return "Poor";
    else if (colorValue <= 4) return "Fine";
    else return "Excellent";
  }
}
