import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { Data as MODELS, DATASETS } from '../../data/dataType';

import { BACKEND_URL, ML_URL } from '../globalVar'

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
    const query = `/?name=${name}`

    this.http.get<MODELS[]>(BACKEND_URL + 'api/model-data/versioning' + query, { headers: headers })
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
    const body = {
      did: id,
      dataUrl: url,
      size: testSize,
      target: target
    }

    return this.http.post(ML_URL + 'model-recommend', body)
  }

  getCSV(url: string) {
    return this.http.post(ML_URL + 'csv-to-json', {url})
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
