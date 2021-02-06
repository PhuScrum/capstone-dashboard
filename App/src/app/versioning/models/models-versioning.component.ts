import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { generateEchartOption } from './echart-helpers';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { Data as MODEL, Crop, DATASETS } from 'src/data/dataType';
import { VersioningService } from '../versioning.service';
import { DatasetsService } from '../../profile/datasets/datasets.service';

import { formatToAntArray } from '../helpers';

@Component({
  selector: 'app-version-models',
  templateUrl: './models-versioning.component.html',
  styleUrls: ['./models-versioning.component.css']
})
export class ModelsVersioningComponent implements OnInit, OnDestroy {
  hGutter = 16;
  vGutter = 16;
  @Input() model!: MODEL;
  isShap: boolean = false;
  forcePlotURL: any;
  summaryURL: any;

  chartOption: EChartOption = {};
  chartTitle: string = '';

  fileName: string = '';
  paramType: string = '';
  paramNote: string = '';

  cropType: string[] = [];
  cropData: Crop;

  targetType: string[] = [];
  present = {
    state: 'VIC',
    crop: 'Conola',
    target: 'Yield'
  }

  filterOptions = {
    crop: '',
    target: ''
  }

  // model metrics
  r2Score: number = 0;
  rmse: number = 0;
  mse: number = 0;
  median_absolute_error: number = 0;
  mae: number = 0;

  modelList: MODEL[] = [];
  singleModel: MODEL;

  modelName: string = '';
  currentVersion: string = '';

  isModalVisible: boolean = false;

  testSize: number = 0.2;

  myDatasetList: DATASETS[] = [];
  selectedDataset: DATASETS;

  listOfFeatures: Array<{ value: string; label: string }> = [];
  selectedFeatures: string[] = [];

  savURL: string = '';

  isLoadingContent: boolean = false;
  isGeneratingShap: boolean = false;
  isUploadingSav: boolean = false;

  isGenShapError: boolean = false;

  private modelListSub: Subscription;
  private datasetListSub: Subscription;

  constructor(
    private versioningService: VersioningService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private datasetService: DatasetsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.convertData(this.singleModel);
  }

  ngOnInit(): void {
    this.isLoadingContent = true;
    this.route.queryParams.subscribe(params => {
      const name = params.name;
      const version = params.version;
      this.modelName = name;
      this.currentVersion = version;
      if (window.location.pathname === '/versioning/model') {
        this.fetchData(name, version);
        this.fetchDatasetList();
      }
    })
    // this.forcePlotURL = 'https://storage.googleapis.com/capstone_rmit_2020/b8c8b198-5a7d-11eb-9a8d-44032ceb1a4eout.html';
  }

  stopLoading() {
    this.isLoadingContent = false;
    this.isGeneratingShap = false;
  }

  generateOutputNumber(value: number): number {
    return Number(parseFloat(value.toString()).toFixed(2));
  }

  convertData(resData: MODEL): void {
    if (resData) {
      const {
        r2_score = 0, rmse = 0, mse = 0, mae = 0,
        data_by_crops = [], median_absolute_error = 0,
        fileName = '', type = '', note = '',
      } = resData || {};
      this.chartTitle = `${resData && resData.name} - ${resData && resData.version}`;

      //Model metrics
      this.r2Score = Number(parseFloat(r2_score.toString()) * 100);
      this.mae = this.generateOutputNumber(mae);
      this.mse = this.generateOutputNumber(mse);
      this.median_absolute_error = this.generateOutputNumber(median_absolute_error);
      this.rmse = this.generateOutputNumber(rmse);

      // create list of crop types
      this.cropType = data_by_crops.map(item => item.name);

      // filter crop by crop name
      this.cropData = data_by_crops.find(item => item.name === this.cropType[0]);

      // create list of target Type
      this.targetType = Object.keys(this.cropData.data).filter(item => item !== "year");

      // set default crop filter options
      // set default target filter options
      this.filterOptions = {
        target: this.targetType[0],
        crop: this.cropType[0],
      };

      // Parameter
      this.fileName = fileName;
      this.paramType = type;
      this.paramNote = note;

      // generate echart options
      this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);
    }
  }

  fetchDatasetList() {
    this.datasetService.getData();
    this.datasetListSub = this.datasetService.getDataListUpdateListener()
      .subscribe((data: DATASETS[]) => {
        console.log(data)
        this.myDatasetList = data;
        this.getSelectedDataset(data[0]);
      })
  }

  getSelectedDataset(dataset: DATASETS) {
    this.selectedDataset = dataset;
    this.listOfFeatures = formatToAntArray(dataset.featureList);
  }

  fetchData(modelName: string, version: string): void {
    this.versioningService.getModels(modelName);
    this.modelListSub = this.versioningService.getModelListUpdateListener()
      .subscribe((data: MODEL[]) => {
        this.modelList = data;
        this.getSelectedModel(version, data);
        this.stopLoading();
      });
  }

  getSelectedModel(version: string, models: MODEL[]) {
    const found = models.find(item => item.version.toString() === version.toString());
    this.singleModel = found;
    this.currentVersion = found.version;
    if (found.shap) {
      this.forcePlotURL = this.safeURL(found.shap[0].force_plot_html)
      this.summaryURL = this.safeURL(found.shap[0].summary_plot)
    } else {
      this.forcePlotURL = this.safeURL('')
      this.summaryURL = this.safeURL('')
    }
    this.convertData(found);
  }

  safeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  selectCropType(crop: string): void {
    this.filterOptions = {
      crop,
      ...this.filterOptions,
    };
    this.cropData = this.singleModel.data_by_crops.find(item => item.name === crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);

  }

  selectTargetType(target: string): void {
    this.filterOptions = {
      ...this.filterOptions,
      target,
    };
    // this.cropData = this.singleModel.data_by_crops.find(item => item.name === this.filterOptions.crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);
  }


  onSelectVersion(version: string): void {
    this.getSelectedModel(version, this.modelList);
  }

  onSelectTab(shap: boolean): void {
    this.isShap = shap;
  }

  showModal() {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if(this.savURL!=="" && this.selectedFeatures.length === 1) this.generateShap();
    else this.isGenShapError = true;
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  generateShap() {
    this.isGeneratingShap = true;
    this.versioningService.generateShap(this.savURL, this.selectedDataset.url, this.selectedFeatures, this.singleModel.id, this.testSize)
    .subscribe(result => {
      this.isGenShapError = false;
      this.fetchData(this.modelName, this.currentVersion)
    }, err => {
      this.isGenShapError = true;
      this.stopLoading();
    })
  }

  onSavPicked(event: Event): void {
    this.isUploadingSav = true;
    const file = (event.target as HTMLInputElement).files[0];

    // this.modelService.onSaveModelFile(file, this.selectedType).subscribe(result => this.fetchData())
    this.versioningService.onSaveSavFile(file)
    .subscribe(result => {
      this.isUploadingSav = false;
      this.savURL = result.gcsUrl;
    }, err => {
      this.isUploadingSav = false;
    })
  }

  ngOnDestroy(): void {
    this.modelListSub.unsubscribe();
    this.datasetListSub.unsubscribe();
  }
}
