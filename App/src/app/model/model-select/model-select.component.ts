import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ModelService } from '../model.service';
import { Data as DataType } from '../../../data/dataType'


@Component({
  selector: 'model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.css']
})
export class ModelSelectComponent implements OnInit {

  @Input() dataList: DataType[] = [];

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<DataType>();

  constructor(
    private modelService: ModelService
  ) {
  }

  ngOnInit(): void {}

  onSelectModel(model: DataType): void {
    this.onSubmit.emit(model)
  }

}
