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

  myValue: any = 20;
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
    this.books = this._dataService.getBooks();
  }

  watchMyValue(proposedValue: string) {
    if (proposedValue)
      proposedValue = proposedValue.replace('%', '');
        
    console.log(this.myValue);
    console.log(proposedValue);
    proposedValue = proposedValue + '%';
    console.log(proposedValue);

    this.myValue = proposedValue;
    return proposedValue;
  }

  updateMessage(message: string, type: string): void { 
    if (message) { 
        this._snackBar.open(`${type}: ${message}`, 'DISMISS', { 
            duration: 3000 
        }); 
    }
  }

  onRatingUpdate(book: Ibook): void { 
    this.updateMessage(book.title, " Rating has been updated"); 
  } 

}
