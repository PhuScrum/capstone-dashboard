import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

import { PROFILE } from '../../../data/dataType'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {
  isVersioning = false;
  isLogin = false;
  private authListenerSubs: Subscription;
  public userId: string;
  public userName: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isVersioning = window.location.pathname.includes('versioning');
    this.isLogin = this.authService.getIsLogin()
    this.userId = this.authService.getUserId()
    this.userName = this.authService.getUserName();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      data => {
        this.isLogin = data.isLogin;
        this.userName = data.userName;
      }
    )
  }

  onLogout() {
    this.authService.onLogout()
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

}
