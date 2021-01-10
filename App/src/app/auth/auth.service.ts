import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './authData.model';

const BACKEND_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogin = false;
  private secret: string;
  private userId: string;
  private tokenTimer: any;

  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getIsLogin(){
    return this.isLogin;
  }

  getSecret() {
    return this.secret;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  onLogin(email: string, password: string) {
    const body: AuthData = {
      username: email,
      password: password
    }

    this.http.post<any>(BACKEND_URL + "api/auth/login", body)
    .subscribe(result => {
      this.saveAuthData(result.secret, result.instance['@ref'].id, true)
      this.isLogin = true;
      this.secret = result.secret;
      this.userId = result.instance['@ref'].id
      this.router.navigate([`profile/${this.userId}`])
      this.authStatusListener.next(this.isLogin)
    },error => {
      console.log(error)
      this.authStatusListener.next(false)
    })
  }

  onLogout() {
    this.secret = null
    this.isLogin = false
    this.authStatusListener.next(this.isLogin)
    this.userId = null
    this.clearAuthData()
    this.router.navigate(['/'])
  }

  private saveAuthData(secret: string, userId: string, isLogin: boolean) {
    localStorage.setItem("secret", secret);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isLogin", isLogin.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('secret');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const secret = localStorage.getItem('secret')
    const userId = localStorage.getItem('userId')
    const isLogin = localStorage.getItem('isLogin')
    if(!secret || !userId) {
      return;
    }
    return {
      secret: secret,
      isLogin: isLogin,
      userId: userId
    }
  }

  private setAuthTimer(duration: number) {
    // console.log("set Auth Timer:", duration)
    this.tokenTimer = setTimeout(() => {
      this.onLogout()
    }, duration * 1000)
  }


  autoAuthUser() {
    const authInformation = this.getAuthData()
    if(!authInformation) return;
    this.secret = authInformation.secret
    this.isLogin = true
    this.userId = authInformation.userId
    this.authStatusListener.next(this.isLogin)
  }

}
