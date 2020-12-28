import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { VersioningPageComponent } from './versioning-page.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { ModelsVersioningComponent } from './models/models-versioning.component';
import { FilterPresentComponent } from './models/filter-present/filter-present.component';

@NgModule({
  declarations: [VersioningPageComponent, DatasetsComponent, ModelsVersioningComponent, FilterPresentComponent],
  imports: [
    CommonModule,
    NzTimelineModule,
    NzTableModule,
    NzProgressModule,
    NzGridModule,
    FormsModule,
    NzSelectModule,
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
