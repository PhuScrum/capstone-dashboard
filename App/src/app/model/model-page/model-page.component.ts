import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModelService } from '../model.service';
import { Data as DataType } from '../../../data/dataType'

@Component({
  selector: 'model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.css']
})
export class ModelPageComponent implements OnInit, OnDestroy {

  dataList: DataType[] = [];
  singleData: DataType;

  private dataListSub: Subscription;

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.modelService.getData();
    this.dataListSub = this.modelService.getDataListUpdateListener()
    .subscribe((data: DataType[]) => {
      this.dataList = data;
      this.singleData = data[0];
    });
  }

  parentFunction(data: DataType): void {
    this.singleData = data;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dataListSub.unsubscribe()
  }

}
