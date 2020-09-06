import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filter-present',
  templateUrl: './filter-present.component.html',
  styleUrls: ['./filter-present.component.css']
})
export class FilterPresentComponent implements OnInit {

    _data;

  get data(){
    return this._data;
  }

  @Input() set data(data) {
    if(data) {
     this._data = data;
    }
  }



  inputData = {}
  constructor() { }

  ngOnInit(): void {
    this.inputData = this.data
    console.log('passingdata: ', this.inputData, this.data, this._data)

  }

}
