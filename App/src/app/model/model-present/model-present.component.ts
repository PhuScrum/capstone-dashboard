import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts';

import { Data as DataType, Crop } from 'src/data/dataType';

import { generateEchartOption } from './echart-helpers';

@Component({
  selector: 'model-present',
  templateUrl: './model-present.component.html',
  styleUrls: ['./model-present.component.css']
})
export class ModelPresentComponent implements OnInit, OnChanges {
  @Input() dataList: DataType[] = [];
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

  generateOutputNumber(value: number): number {
    return Number(parseFloat(value.toString()).toFixed(2));
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.model) {
      const {
        r2_score = 0, rmse = 0, mse = 0, mae = 0,
        data_by_crops = [], median_absolute_error = 0,
      } = this.model || {};
      this.chartTitle = 'Agtuary model ' + this.model.name;

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

  ngOnInit(): void {
   }

  selectCropType(crop: string): void {
    this.filterOptions = {
      crop,
      ...this.filterOptions,
    };
    this.cropData = this.model.data_by_crops.find(item => item.name === crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);

  }

  selectTargetType(target: string): void {
    this.filterOptions = {
      ...this.filterOptions,
      target,
    };
    // this.cropData = this.model.data_by_crops.find(item => item.name === this.filterOptions.crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target, this.chartTitle);
  }


}
