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
  @Input() model!: DataType;

  chartOption: EChartOption = {};
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
  r2ScoreShow: number = 0;
  rmse: number = 0;
  formatRMSETitle: Function;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.model) {

      const { r2_score = 0, rmse = 0, data_by_crops = [] } = this.model || {};
      this.r2Score = Number(parseFloat(r2_score.toString()) * 100);
      this.rmse = Number((parseFloat(rmse.toString()) * 100).toFixed(2));
      this.r2ScoreShow = this.r2Score < 0 ? 0 : this.r2Score;
      this.formatRMSETitle = () => this.rmse;;
      // create list of crop types
      this.cropType = data_by_crops.map(item => item.name);

      // set default crop filter options
      this.filterOptions.crop = this.cropType[0];

      // filter crop by crop name
      this.cropData = data_by_crops.find(item => item.name === this.filterOptions.crop);
      // create list of target Type
      this.targetType = Object.keys(this.cropData.data).filter(item => item !== "year");

      // set default target filter options
      this.filterOptions.target = this.targetType[0];

      // generate echart options
      this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target);

    }


  }

  ngOnInit(): void { }

  selectCropType(crop: string): void {
    this.filterOptions.crop = crop;
    this.cropData = this.model.data_by_crops.find(item => item.name === this.filterOptions.crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target);
  }

  selectTargetType(target: string): void {
    this.filterOptions.target = target;
    // this.cropData = this.model.data_by_crops.find(item => item.name === this.filterOptions.crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData, this.filterOptions.target);
  }


}
