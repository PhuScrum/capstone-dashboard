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

  filterOptions = {
    crop: '',
    target: 'production'
  }

  // model metrics
  r2Score: number = 0;
  rmse: number = 0;


  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.model) {
      this.r2Score = parseFloat(this.model.r2_score.toString()) * 100;
      this.rmse = Number(parseFloat(this.model.rmse.toString()).toFixed(2));

      // create list of crop types
      this.cropType = this.model.data_by_crops.map(item => item.name);

      // set default crop filter options
      this.filterOptions.crop = this.cropType[0];

      // filter crop by crop name
      this.cropData = this.model.data_by_crops.find(item => item.name === this.filterOptions.crop);

      // generate echart options
      this.chartOption = generateEchartOption(this.cropData);
    }


  }

  ngOnInit(): void {}

  selectCropType(crop: string): void {
    this.filterOptions.crop = crop;
    this.cropData = this.model.data_by_crops.find(item => item.name === this.filterOptions.crop);
    // generate echart options
    this.chartOption = generateEchartOption(this.cropData);
  }


}
