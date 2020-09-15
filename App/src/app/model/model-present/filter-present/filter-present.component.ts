import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'filter-present',
  templateUrl: './filter-present.component.html',
  styleUrls: ['./filter-present.component.css']
})
export class FilterPresentComponent implements OnInit {

  @Input() cropType!: string[];

  selectedType: string;

  @Output() selectTarget:EventEmitter <any> = new EventEmitter()
  
  inputData = {}
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.selectedType)
  }

  onTargetChange(): void{
    console.log(this.selectedType)
  }

  onSelectTarget(type: string): void{
    console.log('sendtype: ')
    console.log(type)
    this.selectedType = type
    this.selectTarget.emit(type)
  }

  log(value: string): void {
    console.log(value);
  }

}
