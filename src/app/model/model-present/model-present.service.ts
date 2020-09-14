import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as dataList from '../../../data'
import {Data as DataType} from '../../../data/dataType'

@Injectable({
  providedIn: 'root'
})
export class ModelPresentService {

  constructor(
    private http: HttpClient
  ) { }

  getData(): DataType[] {
    return dataList;
  }

}
