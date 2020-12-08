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
      { key: 1, name: 'Mehmet', surname: 'Baran', birthYear: '1987', birthPlace: 'San FU Lou' },
      { name: 'Zerya Betul', surname: 'Baran', birthYear: '2000', birthPlace: 'Hokaidou' },
      { name: 'Hakimi', surname: 'Yazin', birthYear: '1992', birthPlace: 'Texas' },
    ];
  }


}
