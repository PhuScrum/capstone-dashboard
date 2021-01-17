import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
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
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getData(name: string) {

    const secret = this.authService.getSecret();
    let headers = new HttpHeaders().set('secret', secret);
z
    this.http.get<DataType[]>(BACKEND_URL + 'api/model-data/myModels', { headers: headers })
      .subscribe(data => {
        this.dataList = data;
        this.dataListUpdated.next([...this.dataList]);
      });
  }

  getDataSet(name: string) {

    const secret = this.authService.getSecret();
    let headers = new HttpHeaders().set('secret', secret);

    const query = `/?name=${name}`

    this.http.get<DATASETS[]>( BACKEND_URL + 'api/dataset/versioning' + query, {headers: headers})
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
