import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts';
import { generateEchartOption } from './echart-helpers';
import { Subscription } from 'rxjs';

import { Data as DataType, Crop } from 'src/data/dataType';
import { VersioningService } from '../versioning.service';

@Component({
  selector: 'app-version-models',
  templateUrl: './models-versioning.component.html',
  styleUrls: ['./models-versioning.component.css']
})
export class ModelsVersioningComponent implements OnInit {
  hGutter = 16;
  vGutter = 16;
  @Input() model!: DataType;

  chartOption: EChartOption = {};
  chartTitle: string = '';

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

  dataList: DataType[] = [];
  singleData: DataType;

  private dataListSub: Subscription;
  generateOutputNumber(value: number): number {
    return Number(parseFloat(value.toString()).toFixed(2));
  }
  constructor(
    private modelService: VersioningService
  ) { }

  convertData(resData: DataType) {
    if (resData) {
      const {
        r2_score = 0, rmse = 0, mse = 0, mae = 0,
        data_by_crops = [], median_absolute_error = 0,
      } = resData || {};
      this.chartTitle = `Agtuary model ${resData && resData.name}`;

      //Model metrics
      this.r2Score = Number(parseFloat(r2_score.toString()) * 100);
      this.mae = this.generateOutputNumber(mae)
      this.mse = this.generateOutputNumber(mse)
      this.median_absolute_error = this.generateOutputNumber(median_absolute_error)
      this.rmse = this.generateOutputNumber(rmse)

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
      // generate echart options
      this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);
    }
  }

  fetchData(modelName): void {
    this.modelService.getData();
    this.dataListSub = this.modelService.getDataListUpdateListener()
      .subscribe((data: DataType[]) => {
        this.dataList = data;
        this.singleData = Array.isArray(data) && data.find((item) => item.name === modelName);
        this.convertData(this.singleData);

      });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.convertData(this.singleData);
  }

  ngOnInit(): void {
    const search = window.location.search;
    const modelName = typeof search === 'string' && search.includes('?name=') && search.split('?name=')[1];
    if (window.location.pathname === '/versioning/model') {
      this.fetchData(modelName);
    }
  }

  selectCropType(crop: string): void {
    this.filterOptions = {
      crop,
      ...this.filterOptions,
    };
    this.cropData = this.singleData.data_by_crops.find(item => item.name === crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);

  }

  selectTargetType(target: string): void {
    this.filterOptions = {
      ...this.filterOptions,
      target,
    };
    // this.cropData = this.singleData.data_by_crops.find(item => item.name === this.filterOptions.crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);
  }


  ngOnDestroy(): void {
    if (this.dataListSub) {
      this.dataListSub.unsubscribe()
    }
  }
}
