import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ModelService } from '../model.service';
import { Data as DataType } from '../../../data/dataType'

import { mlOpts } from '../../globalVar'


@Component({
  selector: 'model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.css'],
})
export class ModelSelectComponent implements OnInit {
  mlOpts: any[] = [];
  selectedType = "Linear Regression";

  hGutter = 16;
  vGutter = 16;

  @Input() dataList: DataType[] = [];
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<DataType>();
  @Output() onUploadModel: EventEmitter<any> = new EventEmitter<{file: File, selectedType: string}>();

  constructor(
    private modelService: ModelService
  ) {
  }

  ngOnInit(): void {
    this.mlOpts = mlOpts;
  }

  onSelectModel(model: DataType): void {
    this.onSubmit.emit(model)
  }

  onModelPicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const body = {file, selectedType: this.selectedType}
    this.onUploadModel.emit(body)
  }

  typeChange(value: any): void {
    this.selectedType = value;
  }

}
