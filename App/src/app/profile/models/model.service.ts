import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../auth/auth.service'

import { Data as DataType } from '../../../data/dataType'

const BACKEND_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private dataList: DataType[] = [];
  private dataListUpdated = new Subject<DataType[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getData() {
    const secret = this.authService.getSecret();
    let headers = new HttpHeaders().set('secret', secret);

    this.http.get<DataType[]>( BACKEND_URL + 'api/model-data/myModels', {headers: headers})
    .subscribe(data => {
      this.dataList = data;
      this.dataListUpdated.next([...this.dataList]);
    });
  }

  getDataListUpdateListener() {
    return this.dataListUpdated.asObservable();
  }

  onSaveModelFile(model: File): Observable<any> {
    
    const body = new FormData();
    body.append('modelData', model);

    return this.http.post(BACKEND_URL + 'api/model-data', body);
  }
}
