import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DATASETS as DataType } from '../../../data/dataType'

import { DatasetsService } from './datasets.service'

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit, OnDestroy {
  hGutter = 16;
  vGutter = 16;

  dataList: DataType[] = [];
  private dataListSub: Subscription;

  constructor(
    private datasetService: DatasetsService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onSelectModel(item) {
    console.log(item)
  }

  fetchData(): void {
    this.datasetService.getData();
    this.dataListSub = this.datasetService.getDataListUpdateListener()
      .subscribe((data: DataType[]) => {
        this.dataList = data;
        console.log('data: ', data);
      });
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
