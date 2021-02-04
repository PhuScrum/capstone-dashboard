import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { SafePipeModule } from '../pipe/safe.pipe.module';

import { VersioningPageComponent } from './versioning-page.component';
import { DatasetVersioningComponent } from './datasets/datasets.component';
import { ModelsVersioningComponent } from './models/models-versioning.component';
import { FilterPresentComponent } from './models/filter-present/filter-present.component';

@NgModule({
  declarations: [VersioningPageComponent, DatasetVersioningComponent, ModelsVersioningComponent, FilterPresentComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SafePipeModule,
    NzButtonModule,
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
export class VersioningModule { }
