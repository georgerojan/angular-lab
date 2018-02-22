import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  pageTitle:string = "About Me";
  constructor() { }

  ngOnInit() {  
    console.log('About Me - Initialized');  
  }

  ngOnDestroy() {
    console.log('About Me - Destroyed');
  }

}
