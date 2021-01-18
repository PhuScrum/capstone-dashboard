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

  datasetName: string = '';

  isVisible = false;
  testSize = 0.2;

  dataSet: DATASETS[] = [];
  singleData: DATASETS;

  // listOfFeatures: Array<{ label: string; value: string }> = [];
  listOfFeatures: string[] = [];
  selectedFeatures: string[] = [];

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
      this.listOfFeatures = data[0].featureList;
    });

  }

  ngOnInit(): void {
    console.log('on init')
    const search = window.location.search;
    const name = typeof search === 'string' && search.includes('?name=') && search.split('?name=')[1];
    this.datasetName = name;
    if (window.location.pathname === '/versioning/dataset') {
      this.fetchData(this.datasetName);
    }
  }

  onSelectVersion(version: string): void {
    const found = this.dataSet.find(item => item.version === version);
    this.singleData = found;
    this.listOfFeatures = found.featureList;
  }

  getVersionRecommend(version: string): void {
    this.versioningService.trainDataset(this.singleData.id, this.singleData.url, this.testSize, this.selectedFeatures, this.datasetName)
    // this.dataListSub = this.versioningService.getDataSetUpdateListener()
    // .subscribe((data: DATASETS[]) => {
    //   this.dataSet = data;
    //   this.singleData = data.find(item => item.version === version);
    // });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.getVersionRecommend(this.singleData.version)
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
