import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DATASETS } from 'src/data/dataType';
import { VersioningService } from '../versioning.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  hGutter = 16;
  vGutter = 16;
  dataSet: DATASETS[] = [];
  singleData: DATASETS;

  isRecommended = false;

  private dataListSub: Subscription
  constructor(
    private versioningService: VersioningService,

  ) { }

  fetchData(dataSetName: string): void {
    this.versioningService.getDataSet(dataSetName);
    this.dataListSub = this.versioningService.getDataSetUpdateListener()
    .subscribe((data: DATASETS[]) => {
      this.dataSet = data;
      this.singleData = data[0];
    });

  }

  ngOnInit(): void {
    const search = window.location.search;
    const dataSetName = typeof search === 'string' && search.includes('?name=') && search.split('?name=')[1];
    if (window.location.pathname === '/versioning/dataset') {
      this.fetchData(dataSetName);
    }
  }

  onSelectVersion(version: string): void {
    this.singleData = this.dataSet.find(item => item.version === version);
  }

  getVersionRecommend(id: string): void {
    this.versioningService.trainDataset(id)
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
