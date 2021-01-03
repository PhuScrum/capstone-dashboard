import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DATASETS as DataType } from 'src/data/dataType';
import { VersioningService } from '../versioning.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  hGutter = 16;
  vGutter = 16;
  dataSet: DataType[] = [];

  private dataListSub: Subscription
  constructor(
    private modelService: VersioningService,

  ) { }

  fetchData(): void {
    this.modelService.getDataSet();
    this.dataListSub = this.modelService.getDataSetUpdateListener()
    .subscribe((data: DataType[]) => {
      this.dataSet = data;
    });

  }

  ngOnInit(): void {
    if (window.location.pathname === '/versioning/dataset') {
      this.fetchData();
    }
  }


  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
