import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts';

import * as data from './model_random_forest.json'



// import * as fs from 'file-system'

import { ModelService } from '../model.service';
import { Data as DataType } from 'src/data/dataType';


@Component({
  selector: 'model-present',
  templateUrl: './model-present.component.html',
  styleUrls: ['./model-present.component.css']
})
export class ModelPresentComponent implements OnInit, OnChanges {
    @Input() model: DataType;


  chartOption: EChartOption = {

  };

  dataList: DataType[] = [];

  data = data
  taget= data.taget
  r2Score= parseFloat(data.R2_Score) * 100
  rmse= parseFloat(data.RMSE).toFixed(2)
  state= data.data.state
  type= data.type
  present = {
      state: 'VIC',
      type: 'Conola',
      target: 'Yield'
  }
  constructor() {
    this.data = data
    this.chartOption = {
      title: {
          text: 'Agtuary model presentation'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['expense', 'revenue']
      },
      grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: 'expense',
              type: 'line',
              stack: 'quantity',
              data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
              name: 'revenue',
              type: 'line',
              stack: 'quantity',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
      ]
  };

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit(): void {
      console.log('file json: ',data.name, data.RMSE, data.taget);
        // console.log(this.data)
    //  this.dataList = this.modelService.getData();
    //   console.log(this.dataList)

  }

  selectState(state: string): void{
    this.present.state = state
  }
  selectTarget(target: string): void{
     console.log(target)
     this.present.target = target
     console.log(this.present.target)

  }


}
