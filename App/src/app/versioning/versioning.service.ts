import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Data as DataType, DATASETS } from '../../data/dataType'

const BACKEND_URL = 'http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class VersioningService {
  private dataList: DataType[] = [];
  private dataSet: DATASETS[] = [];
  private dataListUpdated = new Subject<DataType[]>();
  private dataSetUpdated = new Subject<DATASETS[]>();

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

  getDataSet() {
    this.http.get<DATASETS[]>( BACKEND_URL + 'api/dataset')
    .subscribe(data => {
      this.dataSet = data;
      this.dataSetUpdated.next([...this.dataSet]);
    });
  }

  getDataListUpdateListener() {
    return this.dataListUpdated.asObservable();
  }
  getDataSetUpdateListener() {
    return this.dataSetUpdated.asObservable();
  }

  onSaveModelFile(model: File): Observable<any> {
    
    const body = new FormData();
    body.append('modelData', model);

    return this.http.post(BACKEND_URL + 'api/model-data', body);
  }
}
