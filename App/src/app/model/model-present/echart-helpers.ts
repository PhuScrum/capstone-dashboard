import { EChartOption } from 'echarts';
import { get } from 'lodash';
import { Crop } from '../../../data/dataType';

const totalYearAxis = function (year1: number[] = [], year2: number[] = []): number[] {
  let totalYear: number[] = [];
  let result: number[] = [];

  // create an array of unique years from year1 and year2
  totalYear = Array.from(new Set(year1.concat(year2)));

  // sort the total year incrementally
  result = totalYear.sort(function (a, b) { return a - b });

  return result;
}

const createHashMap = function (year: number[] = [], values: number[] = []): any[] {
  let seriesData = [];
  let unitSerie = [];

  if (year.length !== values.length) {
    //throw error in case of different lengths
    throw Error('Length must be the same')
  } else {
    // create data series from elements of type [year, value]
    for (let i = 0; i < year.length; i++) {
      unitSerie = [year[i].toString(), values[i]];
      seriesData.push(unitSerie);
    }

    return seriesData;
  }
}

//function to generate echart options
export const generateEchartOption = function (data: Crop, targetType: string): EChartOption {
  let options: EChartOption = {};
  console.log('data: ', data);
  const dataYear = get(data, 'data.year');
  const predictionYear = get(data, 'prediction.year');
  const dataTargetType = get(data, `data.${targetType}`);
  const predictionTargetType = get(data, `prediction.${targetType}`);
  options = {
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
      data: totalYearAxis(dataYear, predictionYear)
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
        data: createHashMap(dataYear, dataTargetType)
      },
      {
        name: 'prediction',
        type: 'line',
        stack: 'quantity',
        lineStyle: {
          type: 'dashed'
        },
        data: createHashMap(predictionYear, predictionTargetType)
      }
    ]
  };

  return options;
}
