import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

const BACKEND_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUpdated = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  onLogin(email: string, password: string): Observable<any> {
    const body = {
      username: email,
      password: password
    }
    return this.http.post(BACKEND_URL + "api/auth/login", body)
  }
}
