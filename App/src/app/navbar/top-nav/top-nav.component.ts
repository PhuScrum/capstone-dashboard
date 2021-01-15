import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  public userName: string = "";
  public firstName: string;

  //modal trigger
  isVisible = false;

  constructor(
    private authService: AuthService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.isVersioning = window.location.pathname.includes('versioning');
    this.isLogin = this.authService.getIsLogin()
    this.userId = this.authService.getUserId()
    this.userName = this.authService.getUserName();
    this.firstName = this.userName.replace(/ .*/,'');

    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      data => {
        this.isLogin = data.isLogin;
        this.userName = data.userName;
        this.firstName = this.userName.replace(/ .*/,'');
      }
    )
  }

  onLogout() {
    this.authService.onLogout()
  }

  showWarning(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onLogout(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

}
