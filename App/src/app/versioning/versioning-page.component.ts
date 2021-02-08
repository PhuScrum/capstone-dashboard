import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-versioning-page',
  templateUrl: './versioning-page.component.html',
  styleUrls: ['./versioning-page.component.css']
})
export class VersioningPageComponent implements OnInit {

  isModel = false;
  constructor() { }

  ngOnInit(): void {
    this.isModel = window.location.pathname === '/versioning/model';
  }

}
