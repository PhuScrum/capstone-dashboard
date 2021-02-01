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
  private userName: string = "";

  //set expiration in 2 hour (3600s)
  private expiresIn: number = 2 * 3600;

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

      this.setAuthTimer(this.expiresIn)
      const now = new Date();
      const expirationDate = new Date(now.getTime() + this.expiresIn * 1000)

      this.saveAuthData(secret, userId, true, userName, expirationDate)
      this.isLogin = true;
      this.secret = secret;
      this.userId = userId;
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
        userName: ""
      })
    })
  }

  onLogout() {
    clearTimeout(this.tokenTimer)
    const localSecret = this.getSecret();
    let headers = new HttpHeaders().set('secret', localSecret);

    this.http.post<boolean>(BACKEND_URL + "api/auth/logout", {}, {headers: headers})
    .subscribe(result => {
      this.clearAuthData()
      this.router.navigate(['/'])
      this.secret = null
      this.isLogin = false
      this.userId = null
      this.authStatusListener.next({
        isLogin: false,
        userName: ""
      })
    }, error => {
      console.log(error)
      this.authStatusListener.next({
        isLogin: false,
        userName: ""
      })
    })
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.onLogout()
    }, duration * 1000)
  }

  private saveAuthData(secret: string, userId: string, isLogin: boolean, userName: string, expirations: Date) {
    localStorage.setItem("secret", secret);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isLogin", isLogin.toString());
    localStorage.setItem("userName", userName);
    localStorage.setItem('expiration', expirations.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('secret');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const secret = localStorage.getItem('secret')
    const userId = localStorage.getItem('userId')
    const isLogin = localStorage.getItem('isLogin')
    const userName = localStorage.getItem('userName')
    const expirationDate = localStorage.getItem('expiration')

    if(!secret || !userId || !expirationDate) {
      return;
    }
    return {
      secret: secret,
      isLogin: isLogin,
      userId: userId,
      userName: userName,
      expirationDate: new Date(expirationDate),
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData()
    if(!authInformation) return;

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if(expiresIn > 0) {
      this.secret = authInformation.secret
      this.isLogin = true
      this.userId = authInformation.userId
      this.userName = authInformation.userName

      this.authStatusListener.next({
        isLogin: this.isLogin,
        userName: this.userName,
      })
    } else {
      return;
    }
  }

}
