import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModelService } from './model.service';
import { Data as DataType } from '../../../data/dataType'


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  isVisible = false;
  hGutter = 16;
  vGutter = 16;

  dataList: DataType[] = [];
  singleData: DataType;

  private dataListSub: Subscription;

  constructor(
    private modelService: ModelService
  ) {
  }

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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  parentFunction(data: DataType): void {
    this.singleData = data;
  }

  onUploadModel(model: File): void {
    this.modelService.onSaveModelFile(model).subscribe(result => {
      this.fetchData();
    });
  }
  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }

  onSelectModel(item) {
    const { protocol = 'http:', host = 'localhost:4200' } = window.location || {};
    const url = `${protocol}//${host}/versioning/model?name=${item && item.name}`;
    window.location.href = url;
  }

}
