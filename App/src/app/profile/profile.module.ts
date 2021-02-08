import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgZorroAntdModule } from '../ng-zorro-antd.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ProfilePageComponent } from './profile-page.component';
import { ModelsComponent } from './models/models.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';

@NgModule({
  declarations: [ProfilePageComponent, ModelsComponent, DatasetsComponent, ProfileSummaryComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ]
})
export class ProfileModule { }
