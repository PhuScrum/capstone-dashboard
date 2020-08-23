import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'model-present',
  templateUrl: './model-present.component.html',
  styleUrls: ['./model-present.component.css']
})
export class ModelPresentComponent implements OnInit {
  chartOption: EChartOption = {
  
  };
  constructor() { 
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

  ngOnInit(): void {
  }

}
