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
    const { protocol = 'http:', host = 'localhost:4200' } = window.location || {};
    const url = `${protocol}//${host}/versioning/dataset?name=${item && item.originalName}`;
    window.location.href = url;
  }

  fetchData(): void {
    this.datasetService.getData();
    this.dataListSub = this.datasetService.getDataListUpdateListener()
      .subscribe((data: DataType[]) => {
        this.dataList = data;
        console.log('data: ', data);
      });
  }

  onDatasetPicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)

    this.datasetService.onSaveDataset(file).subscribe(result => this.fetchData())
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
