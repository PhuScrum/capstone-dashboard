import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VersioningPageComponent } from './versioning-page.component';
import { DatasetsComponent } from './datasets/datasets.component';

@NgModule({
  declarations: [VersioningPageComponent, DatasetsComponent],
  imports: [
    CommonModule,
    NzTimelineModule,
    NzTableModule,
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
export class VersioningModule { }