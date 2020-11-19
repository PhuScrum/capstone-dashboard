import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Data as DataType } from '../../data/dataType'

const BACKEND_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private dataList: DataType[] = [];
  private dataListUpdated = new Subject<DataType[]>();

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    this.http.get<DataType[]>( BACKEND_URL + 'api/model-data')
    .subscribe(data => {
      this.dataList = data;
      this.dataListUpdated.next([...this.dataList]);
    });
  }

  getDataListUpdateListener() {
    return this.dataListUpdated.asObservable();
  }

  onSaveModelFile(model: File): Observable<any> {
    // console.log(model);
    console.log(model)
    
    const body = new FormData();
    body.append('modelData', model);
    console.log(body);

    return this.http.post(BACKEND_URL + 'api/model-data', body);
  }
}
