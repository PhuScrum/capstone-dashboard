import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'filter-present',
  templateUrl: './filter-present.component.html',
  styleUrls: ['./filter-present.component.css']
})
export class FilterPresentComponent implements OnInit {

  @Input() taget;
  @Input() type;
  @Input() state;

  @Output() selectType:EventEmitter <any> = new EventEmitter()
  inputData = {}
  constructor() { }

  ngOnInit(): void {
    console.log('passingdata: ', this.taget)
  }

  sendType(type: string){
    console.log(type)
    this.selectType.emit(type)
  }

}
