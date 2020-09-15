import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Data as DataType } from '../../data/dataType'

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
    this.http.get<DataType[]>('http://localhost:8080/api/model-data')
    .subscribe(data => {
      this.dataList = data;
      this.dataListUpdated.next([...this.dataList]);
    });
  }

  getDataListUpdateListener() {
    return this.dataListUpdated.asObservable();
  }
}
