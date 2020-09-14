import { Component, OnInit } from '@angular/core';

import { ModelService } from '../model.service';
import { Data as DataType } from '../../../data/dataType'


@Component({
  selector: 'model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.css']
})
export class ModelSelectComponent implements OnInit {
  dataList: DataType[] = [];

  constructor(
    private modelService: ModelService
  ) {
  }

  ngOnInit(): void {
    this.modelService.getData()
    .subscribe(data => this.dataList = data)
    console.log(this.dataList)
  }

}
