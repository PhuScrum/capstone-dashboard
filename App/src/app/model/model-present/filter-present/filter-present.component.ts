import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'filter-present',
  templateUrl: './filter-present.component.html',
  styleUrls: ['./filter-present.component.css']
})
export class FilterPresentComponent implements OnInit {

  @Input() cropType!: string[];

  @Output() selectTarget:EventEmitter <any> = new EventEmitter()

  selectedType: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectCropType(type: string): void{
    this.selectedType = type
    this.selectTarget.emit(type)
  }

}
