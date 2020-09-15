import { Component, OnInit } from '@angular/core';

import { ModelService } from '../model.service';
import { Data as DataType } from '../../../data/dataType'

@Component({
  selector: 'model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.css']
})
export class ModelPageComponent implements OnInit {

  dataList: DataType[] = [];
  singleData: DataType;

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.modelService.getData()
    .subscribe(data => {
      this.dataList = data;
      this.singleData = data[0];
    });
  }

  parentFunction(data: DataType): void {
    this.singleData = data;
  }

}
