import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from '../../globalVar'

import { DATASETS as DataType } from '../../../data/dataType'

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  private dataList: DataType[] = [];
  private dataListUpdated = new Subject<DataType[]>();

  constructor(
    private http: HttpClient
  ) {}

  getData() {
    const localSecret = localStorage.getItem('secret')
    let headers = new HttpHeaders().set('secret', localSecret);

    this.http.get<DataType[]>( BACKEND_URL + 'api/dataset/myDatasets', {headers: headers})
    .subscribe(data => {
      this.dataList = data;
      this.dataListUpdated.next([...this.dataList]);
    });
  }

  getDataListUpdateListener() {
    return this.dataListUpdated.asObservable();
  }

  getDatasetCount() {
    return this.dataList.length;
  }
}
