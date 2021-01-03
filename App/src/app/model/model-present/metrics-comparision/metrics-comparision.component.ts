import { Component, OnInit, Input } from '@angular/core';
import { Data as DataType, Crop } from 'src/data/dataType';
import { ModelService } from '../../model.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-metrics-comparision',
  templateUrl: './metrics-comparision.component.html',
  styleUrls: ['./metrics-comparision.component.css']
})
export class MetricsComparisionComponent implements OnInit {
  dataList: DataType[] = [];
  private dataListSub: Subscription;
  constructor(
    private modelService: ModelService
  ) { }

  fetchData(): void {
    this.modelService.getData();
    this.dataListSub = this.modelService.getDataListUpdateListener()
    .subscribe((data: DataType[]) => {
      this.dataList = data;
      console.log(this.dataList)
    });
  }
  ngOnInit(): void {
    this.fetchData();
    console.log(this.dataList)
  }

}
