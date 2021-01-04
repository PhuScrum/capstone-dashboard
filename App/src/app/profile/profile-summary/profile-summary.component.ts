import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProfileService } from '../profile.service'

import { PROFILE } from '../../../data/dataType'

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit {
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

  private profileSub: Subscription

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
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')){
        this.userId = paramMap.get('userId')
        this.fetchProfile(this.userId)
      }
    })
    

    this.datasetCount = 120;
    this.modelCount = 20;
    this.someMetric = 100;

    
  }

  fetchProfile(id: string): void {
    this.profileService.getProfile(id);
    this.profileSub = this.profileService.getProfileUpdateListener()
      .subscribe((profile: PROFILE) => {
        this.profile = profile;
      });
  }

}
