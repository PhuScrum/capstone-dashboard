import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-present',
  templateUrl: './filter-present.component.html',
  styleUrls: ['./filter-present.component.css']
})
export class FilterPresentComponent implements OnInit {

  @Input() cropType!: string[];
  @Input() selectedCropType: string;

  @Input() targetType: string[];
  @Input() selectedTarget: string;

  @Output() selectCropType: EventEmitter<any> = new EventEmitter()
  @Output() selectTargetType: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    if (this.cropType) { this.selectedCropType = this.cropType[0]; }
  }

  onSelectCropType(type: string): void {
    this.selectedCropType = type;
    this.selectCropType.emit(type);
  }

  onSelectTargetType(target: string): void {
    this.selectedTarget = target;
    this.selectTargetType.emit(target);
  }

}
