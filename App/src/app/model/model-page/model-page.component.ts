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

  fetchData(): void {
    this.modelService.getData();
    this.dataListSub = this.modelService.getDataListUpdateListener()
    .subscribe((data: DataType[]) => {
      this.dataList = data;
      this.singleData = data[0];
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  parentFunction(data: DataType): void {
    this.singleData = data;
  }

  onUploadModel(data: any): void {
    const { file, selectedType } = data
    this.modelService.onSaveModelFile(file, selectedType).subscribe(result=> {
      this.fetchData();
    });
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }


}
