import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {
  isVersioning = false;
  isLogin = false;
  private authListenerSubs: Subscription;
  private userId: string

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isVersioning = window.location.pathname.includes('versioning');
    this.isLogin = this.authService.getIsLogin()
    this.userId = this.authService.getUserId()
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuth => this.isLogin = isAuth
    )
  }

  onLogout() {
    this.authService.onLogout()
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

}
