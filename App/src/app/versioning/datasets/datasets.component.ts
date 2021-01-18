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

  currentVersion: string = '';

  listOfFeatures: string[] = [];
  selectedFeatures: string[] = [];

  isRecommendationLoading: boolean = false;
  isPageLoading: boolean = false;

  private dataListSub: Subscription
  constructor(
    private versioningService: VersioningService,

  ) { }

  ngOnInit(): void {
    this.isPageLoading = true;
    const search = window.location.search;
    const name = typeof search === 'string' && search.includes('?name=') && search.split('?name=')[1];
    this.datasetName = name;
    if (window.location.pathname === '/versioning/dataset') {
      this.fetchData(this.datasetName);
    } else {
      this.stopLoading();
    }
  }

  fetchData(dataSetName: string): void {
    this.versioningService.getDataSet(dataSetName);
    this.dataListSub = this.versioningService.getDataSetUpdateListener()
    .subscribe((data: DATASETS[]) => {
      this.dataSet = data;
      this.singleData = data[0];
      // this.currentVersion = data[0].version;
      this.listOfFeatures = data[0].featureList;
      this.stopLoading();
    });

  }

  stopLoading() {
    this.isRecommendationLoading = false;
    this.isPageLoading = false;
  }

  getSelectedData(version: string, dataSet: DATASETS[]) {
    const found = dataSet.find(item => item.version === version);
    this.singleData = found;
    this.currentVersion = found.version;
    this.listOfFeatures = found.featureList;
  }

  onSelectVersion(version: string): void {
    this.getSelectedData(version, this.dataSet);
  }

  getVersionRecommend(version: string): void {
    this.isRecommendationLoading = true;
    this.versioningService.trainDataset(this.singleData.id, this.singleData.url, this.testSize, this.selectedFeatures, this.datasetName)
    .subscribe(result => {
      console.log(result);
      this.versioningService.getDataSet(this.datasetName);
      this.dataListSub = this.versioningService.getDataSetUpdateListener()
      .subscribe((data: DATASETS[]) => {
        console.log(this.currentVersion);
        this.dataSet = data;
        this.getSelectedData(this.currentVersion, data);
        this.stopLoading();
        this.resetTrainingOpts();
      });
    })
  }

  resetTrainingOpts(): void {
    this.testSize = 0.2;
    this.selectedFeatures = [];
  }

  isSelected(version: string): boolean {
    return this.currentVersion === version;
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
