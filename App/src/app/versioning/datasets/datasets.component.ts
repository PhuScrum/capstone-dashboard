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
  singleData: DataType;

  private dataListSub: Subscription
  constructor(
    private modelService: VersioningService,

  ) { }

  fetchData(dataSetName): void {
    this.modelService.getDataSet();
    this.dataListSub = this.modelService.getDataSetUpdateListener()
    .subscribe((data: DataType[]) => {
      this.dataSet = data;
      const selectedItem = Array.isArray(data) && data.find((item) => item && item.originalName === dataSetName);
      const { originalName = '' } = selectedItem || {};
      this.singleData = { ...selectedItem, originalName: typeof originalName === 'string' && originalName.split('_').join(' ') };
    });

  }

  ngOnInit(): void {
    const search = window.location.search;
    const dataSetName = typeof search === 'string' && search.includes('?name=') && search.split('?name=')[1];
    if (window.location.pathname === '/versioning/dataset') {
      this.fetchData(dataSetName);
    }
  }


  ngOnDestroy(): void {
    this.dataListSub.unsubscribe()
  }
}
