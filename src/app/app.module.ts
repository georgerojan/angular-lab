import { BrowserModule } from "@angular/platform-browser";

import { NgModule } from "@angular/core";

import {
  MatListModule,
  MatCardModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatButtonModule,
  MatLineModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { CollectionComponent } from "./collection/collection.component";
import { RatingCategoryPipe } from "./pipes/rating-category.pipe";
import { PercentagePipe } from "./pipes/percentage.pipe";
import { RatingComponent } from "./rating/rating.component";
import { HttpModule } from "@angular/http";
import { TabsComponent } from './tabs/tabs.component';
import { HelpComponent } from './help/help.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CollectionComponent,
    RatingCategoryPipe,
    PercentagePipe,
    RatingComponent,
    TabsComponent,
    HelpComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatLineModule,
    MatInputModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
