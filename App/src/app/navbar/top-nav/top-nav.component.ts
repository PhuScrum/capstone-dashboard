import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  isLogin = false;
  userId: string = "";

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('isLogin')){
      this.isLogin = true;
      this.userId = localStorage.getItem('userId')
    }
  }

}
