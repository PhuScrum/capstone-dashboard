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
      { version: 1, originalName: 'AUS month data set', note: 'Irem losum', features: 250, length: 101, url: '', fileName: "", user: "" },
      { version: 2, originalName: 'AUS month data set', note: 'Irem losum', features: 120, length: 198, url: '', fileName: "", user: ""  },
      { version: 3, originalName: 'AUS month data set', note: 'Irem losum', features: 172, length: 192, url: '', fileName: "", user: ""  },
      { version: 4, originalName: 'AUS month data set', note: 'Irem losum', features: 130, length: 200, url: '', fileName: "", user: "" },
    ]
  }


}
