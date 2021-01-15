import { Component, OnInit, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ProfileService } from '../profile.service'
import { ModelService } from '../models/model.service'
import { DatasetsService } from '../datasets/datasets.service'

import { PROFILE, DATASETS, Data as MODEL } from '../../../data/dataType'

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit, OnDestroy {
  modelCount: number;
  datasetCount: number;
  someMetric: number;

  userId: string = '';

  profile: PROFILE = {
    name: "",
    email: "",
    username: "",
    id: ""
  };

  private profileSub: Subscription;
  private datasetsSub: Subscription;
  private modelSub: Subscription;

  initOpts = {
    renderer: 'svg',
    height: 300
  };

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      type: 'line',
      areaStyle: {}
    }]
  }

  constructor(
    private modelService: ModelService,
    private datasetService: DatasetsService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')){
        this.userId = paramMap.get('userId')
        this.fetchProfile(this.userId)
      } else {
        this.router.navigate(['/'])
      }
    })

    this.modelSub = this.modelService.getDataListUpdateListener()
    .subscribe((models: MODEL[]) => {
      this.modelCount = models.length;
    })

    this.datasetsSub = this.datasetService.getDataListUpdateListener()
    .subscribe((datasets: DATASETS[]) => {
      this.datasetCount = datasets.length;
    })

    this.someMetric = 100;

  }

  fetchProfile(id: string): void {
    this.profileService.getProfile(id);
    this.profileSub = this.profileService.getProfileUpdateListener()
    .subscribe((profile: PROFILE) => {
      this.profile = profile;
    });
  }

  ngOnDestroy(): void {
    if(this.profileSub) this.profileSub.unsubscribe();
    if(this.datasetsSub) this.datasetsSub.unsubscribe();
    if(this.modelService) this.modelSub.unsubscribe();
  }

}
