import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROFILE } from '../../data/dataType'

const BACKEND_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileData: PROFILE;
  private profileUpdated = new Subject<PROFILE>();

  constructor(
    private http: HttpClient
  ) { }

  getProfile(id: string) {
    const localSecret = localStorage.getItem('secret')
    let headers = new HttpHeaders().set('secret', localSecret);
    // headers = headers.set('secret', localStorage.getItem('secret'));
    console.log(headers)
    this.http.get<PROFILE>( BACKEND_URL + `api/user/profile/${id}`, {headers: headers})
    .subscribe(data => {
      this.profileData = data;
      this.profileUpdated.next({...this.profileData});
    });
  }

  getProfileUpdateListener() {
    return this.profileUpdated.asObservable();
  }
}
