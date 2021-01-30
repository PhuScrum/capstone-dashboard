import { Component, OnInit,  PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { DATASETS } from 'src/data/dataType';
import { VersioningService } from '../versioning.service';

import { formatToAntArray, generateTableOptions } from './helpers'

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

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

  csvData: any[] = [];

  currentVersion: string = '';

  listOfFeatures: Array<{ value: string; label: string }> = [];
  selectedFeatures: string[] = [];

  isRecommendationLoading: boolean = false;
  isPageLoading: boolean = false;
  isLoadingTable: boolean = false;

  csvTable:{headers: Array<string>, data: Array<Array<string>>} = {headers:[], data:[[]]};

  shapURL: string = '';
  summaryURL: string ='';

  private dataListSub: Subscription

  constructor(
    private versioningService: VersioningService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isPageLoading = true;

    this.route.queryParams.subscribe(params => {
      const name = params.name;
      const version = params.version;
      this.datasetName = name;
      if (window.location.pathname === '/versioning/dataset') {
        this.fetchData(name, version);
      } else {
        this.stopLoading();
      }
    })
  }

  fetchData(dataSetName: string, version: string): void {
    this.versioningService.getDataSet(dataSetName);
    this.dataListSub = this.versioningService.getDataSetUpdateListener()
    .subscribe((data: DATASETS[]) => {
      this.dataSet = data;
      this.getSelectedData(version, data)
      this.stopLoading();
    });

  }

  getCSV(url: string) {
    this.isLoadingTable = true;
    this.versioningService.getCSV(url).subscribe((data: any) => {
      this.csvTable = generateTableOptions(data)
      this.isLoadingTable = false;
    })
  }

  stopLoading() {
    this.isRecommendationLoading = false;
    this.isPageLoading = false;
  }

  getSelectedData(version: string, dataSet: DATASETS[]) {
    const found = dataSet.find(item => item.version.toString() === version.toString());
    console.log(found)
    if(found.model_recommend && found.model_recommend[0].best_model_shap){
      this.shapURL = found.model_recommend[0].best_model_shap.force_plot_html;
      this.summaryURL = found.model_recommend[0].best_model_shap.summary_plot;
    } else {
      this.shapURL = '';
      this.summaryURL = '';
    }
    this.singleData = found;
    this.currentVersion = found.version;
    this.listOfFeatures = formatToAntArray(found.featureList);
    this.getCSV(found.url)
  }

  onSelectVersion(version: string): void {
    this.currentVersion = version;
    this.getSelectedData(version, this.dataSet);
  }

  getVersionRecommend(version: string): void {
    this.isRecommendationLoading = true;
    this.versioningService.trainDataset(this.singleData.id, this.singleData.url, this.testSize, this.selectedFeatures, this.datasetName)
    .subscribe(result => {
      this.versioningService.getDataSet(this.datasetName);
      this.dataListSub = this.versioningService.getDataSetUpdateListener()
      .subscribe((data: DATASETS[]) => {
        this.dataSet = data;
        this.getSelectedData(version, data);
        this.stopLoading();
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

  viewForcePlot(): void {
    window.location.href = this.shapURL;
  }

  viewSummarPlot(): void {
    window.location.href = this.summaryURL;
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
