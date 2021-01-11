import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service'

import { Data as DataType } from '../../data/dataType'

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
    this.http.get<DataType[]>( BACKEND_URL + 'api/model-data/all')
    .subscribe(data => {
      this.dataList = data;
      this.dataListUpdated.next([...this.dataList]);
    });
  }

  getDataListUpdateListener() {
    return this.dataListUpdated.asObservable();
  }

  onSaveModelFile(model: File): Observable<any> {
    const localSecret = this.authService.getSecret()
    let headers = new HttpHeaders().set('secret', localSecret);

    const body = new FormData();
    body.append('modelData', model);
    body.append('directory', 'models')
    body.append('note', 'hello world')
    body.append('type', 'LinearRegression')

    // const body = {
    //   modelData: model,
    //   directory: 'models',
    //   note: 'hello world',
    //   type: 'LinearRegression'
    // }

    console.log(body)

    return this.http.post(BACKEND_URL + 'api/model-data/upload', body, {headers: headers});
  }
}
