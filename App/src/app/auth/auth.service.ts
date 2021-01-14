import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './authData.model';
import { PROFILE } from '../../data/dataType'

const BACKEND_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogin = false;
  private secret: string;
  private userId: string;
  private tokenTimer: any;
  private userName: string;

  private authStatusListener = new Subject<{ isLogin: boolean; userName: string }>();

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

  getUserName() {
    return this.userName;
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
      const secret = result.secret;
      const userId = result.instance['@ref'].id;
      const userName = result.user.data.name;
      this.saveAuthData(secret, userId, true, userName)
      this.isLogin = true;
      this.secret = secret;
      this.userId = userId
      this.userName = userName
      this.router.navigate([`profile/${this.userId}`])

      this.authStatusListener.next({
        isLogin: this.isLogin,
        userName: this.userName
      })
    },error => {
      console.log(error)
      this.authStatusListener.next({
        isLogin: false,
        userName: null
      })
    })
  }

  onLogout() {
    const localSecret = this.getSecret();
    let headers = new HttpHeaders().set('secret', localSecret);

    this.http.post<boolean>(BACKEND_URL + "api/auth/logout", {}, {headers: headers})
    .subscribe(result => {
      this.clearAuthData()
      this.secret = null
      this.isLogin = false
      this.userId = null
      this.authStatusListener.next({
        isLogin: false,
        userName: null
      })
      this.router.navigate(['/'])
    }, error => {
      console.log(error)
      this.authStatusListener.next({
        isLogin: false,
        userName: null
      })
    })
  }

  private saveAuthData(secret: string, userId: string, isLogin: boolean, userName: string) {
    localStorage.setItem("secret", secret);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isLogin", isLogin.toString());
    localStorage.setItem("userName", userName)
  }

  private clearAuthData() {
    localStorage.removeItem('secret');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const secret = localStorage.getItem('secret')
    const userId = localStorage.getItem('userId')
    const isLogin = localStorage.getItem('isLogin')
    const userName = localStorage.getItem('userName')

    if(!secret || !userId) {
      return;
    }
    return {
      secret: secret,
      isLogin: isLogin,
      userId: userId,
      userName: userName
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
    this.userName = authInformation.userName

    this.authStatusListener.next({
      isLogin: this.isLogin,
      userName: this.userName,
    })
  }

}
