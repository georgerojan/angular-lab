import { Component, OnInit } from '@angular/core';
import { Ibook } from '../Ibook';
import { MatSnackBar } from '@angular/material'; 
import { DataService } from '../services/data.service'; 

@Component({
  selector: 'my-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  pageTitle: string; //property which will be shown in the panel header 
  books: Array<Ibook> = null;
  showOperatingHours: boolean = false; //property for message visibility and toggle button text 
  openingTime: Date; //property that shows the opening time 
  closingTime: Date; //property that shows the closing time

  constructor(private _snackBar: MatSnackBar, private _dataService: DataService) {
    this.openingTime = new Date(); 
    this.openingTime.setHours(10, 0); 
    this.closingTime = new Date(); 
    this.closingTime.setHours(15, 0); 
   }

  ngOnInit() {
    this.getBooks();
  }

  updateMessage(message: string, type: string): void { 
    if (message) { 
        this._snackBar.open(`${type}: ${message}`, 'DISMISS', { 
            duration: 3000 
        }); 
    }
  }

  getBooks(): void {
    this._dataService.getBooks().subscribe( 
      books => this.books = books,
      error => this.updateMessage(<any>error, 'ERROR');
    )
  }

  onRatingUpdate(book: Ibook): void { 
    this.updateMessage(book.title, " Rating has been updated"); 
  } 

  findRatingColor(colorValue:number): string {
    if (colorValue <= 2)
      return "Poor";
    else if (colorValue <= 4)
      return "Fine";
    else
      return "Excellent";
  }

}
