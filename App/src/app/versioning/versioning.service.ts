import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { Data as MODELS, DATASETS } from '../../data/dataType'

const BACKEND_URL = 'http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class VersioningService {
  private models: MODELS[] = [];
  private dataSet: DATASETS[] = [];

  private modelsUpdated = new Subject<MODELS[]>();
  private dataSetUpdated = new Subject<DATASETS[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getModels(name: string) {
    const secret = this.authService.getSecret();
    let headers = new HttpHeaders().set('secret', secret);
    this.http.get<MODELS[]>(BACKEND_URL + 'api/model-data/myModels', { headers: headers })
      .subscribe(data => {
        this.models = data;
        this.modelsUpdated.next([...this.models]);
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

  trainDataset(id: string, url: string, testSize: number, target: string[], datasetName: string) {
    // const body = new FormData();
    // body.append('did', id)
    // body.append('dataUrl', url)
    // body.append('size', testSize)
    // body.append('target', target)
    const body = {
      did: id,
      dataUrl: url,
      size: testSize,
      target: target
    }

    console.log(body)

    this.http.post('http://localhost:5000/model-recommend', body)
    .subscribe(result => {
      this.getDataSet(datasetName)
    })
  }

  getDataListUpdateListener() {
    return this.modelsUpdated.asObservable();
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
