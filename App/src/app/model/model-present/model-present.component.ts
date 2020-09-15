import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts';

import * as data from './model_random_forest.json'



// import * as fs from 'file-system'

import { ModelService } from '../model.service';
import { Data as DataType } from 'src/data/dataType';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'model-present',
  templateUrl: './model-present.component.html',
  styleUrls: ['./model-present.component.css']
})
export class ModelPresentComponent implements OnInit, OnChanges {
    @Input() model!: DataType;

    currentModel: any;


  chartOption: EChartOption = {

  }

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

  }

  totalYearAxis(year1: number[] , year2: number[]): number[] {
    let totalYear = [];
    totalYear = year1.concat(year2);

    const result = Array.from(new Set(totalYear));
    const sortedYear = result.sort(function(a, b){return a-b});

    return sortedYear;
  }

  createHashMap(year: number[], values: number[]): any[]{
    let seriesData = [];
    let unitSerie = [];

    if (year.length !== values.length) {
        throw error('Length must be the same')
    } else {
        for (let i = 0; i < year.length; i ++) {
            unitSerie = [year[i].toString(), values[i]];
            seriesData.push(unitSerie);
        }
        return seriesData;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
     console.log(this.createHashMap(this.model.data_by_crops[0].data.year, this.model.data_by_crops[0].data.production))
    this.chartOption = {
        title: {
            text: 'Agtuary model presentation'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['real', 'prediction']
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
            data:  this.totalYearAxis(this.model.data_by_crops[0].data.year, this.model.data_by_crops[0].prediction.year)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'real',
                type: 'line',
                stack: 'quantity',
                // data: this.model.data_by_crops[0].data.production
                data: this.createHashMap(this.model.data_by_crops[0].data.year, this.model.data_by_crops[0].data.production)
            },
            {
                name: 'prediction',
                type: 'line',
                stack: 'quantity',
                lineStyle: {
                    type: 'dashed'
                },
                data: this.createHashMap(this.model.data_by_crops[0].prediction.year, this.model.data_by_crops[0].prediction.production)
            }
        ]
    };
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
