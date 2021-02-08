import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from '../../globalVar'

import { AuthService } from '../../auth/auth.service'

import { DATASETS as DataType } from '../../../data/dataType'

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  private dataList: DataType[] = [];
  private dataListUpdated = new Subject<DataType[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
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

  onSaveDataset(dataset: File): Observable<any> {
    const localSecret = this.authService.getSecret()
    let headers = new HttpHeaders().set('secret', localSecret);

    const body = new FormData();
    body.append("datasetData", dataset);
    body.append('directory', 'dataset')
    body.append('note', 'my dataset')

    return this.http.post(BACKEND_URL + 'api/dataset/upload', body, {headers: headers});
  }
}
