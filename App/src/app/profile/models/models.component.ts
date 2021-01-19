import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModelService } from './model.service';
import { Data as DataType } from '../../../data/dataType';

import { mlOpts } from '../../globalVar'


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  isVisible = false;
  mlOpts: any[] = [];

  hGutter = 16;
  vGutter = 16;

  dataList: DataType[] = [];
  singleData: DataType;

  selectedType: string;

  private dataListSub: Subscription;

  constructor(
    private modelService: ModelService
  ) {}

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
    this.mlOpts = mlOpts;
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

  onModelPicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    this.modelService.onSaveModelFile(file, this.selectedType).subscribe(result => this.fetchData())
  }

  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }

  onSelectModel(item) {
    const { protocol = 'http:', host = 'localhost:4200' } = window.location || {};
    const url = `${protocol}//${host}/versioning/model?name=${item && item.slug}&version=${item && item.version}`;
    window.location.href = url;
  }

  typeChange(value: any): void {
    console.log(value);
    this.selectedType = value;
  }

}
