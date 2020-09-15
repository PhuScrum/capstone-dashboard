import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Data as DataType } from '../../data/dataType'

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private dataList: DataType[] = [];
  private singleData: DataType;

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<DataType[]> {
    return this.http.get<DataType[]>('http://localhost:8080/api/model-data');
  }
}
