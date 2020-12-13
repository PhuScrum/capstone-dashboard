import { Component, OnInit } from '@angular/core';
import { DATASETS as DataType } from '../../../data/dataType'

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  hGutter = 16;
  vGutter = 16;
  dataSet: DataType[] = [];
  constructor() { }

  ngOnInit(): void {
    this.dataSet = [
      { key: 1, title: 'AUS month data set', description: 'Irem losum', features: 250, length: 101 },
      { key: 2, title: 'AUS month data set', description: 'Irem losum', features: 120, length: 198 },
      { key: 3, title: 'AUS month data set', description: 'Irem losum', features: 172, length: 192 },
      { key: 4, title: 'AUS month data set', description: 'Irem losum', features: 130, length: 200 },
    ]
  }


}
