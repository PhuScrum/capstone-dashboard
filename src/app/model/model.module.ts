import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelPageComponent } from './model-page/model-page.component';
import { ModelSelectComponent } from './model-select/model-select.component';
import { ModelPresentComponent } from './model-present/model-present.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FilterPresentComponent } from './model-present/filter-present/filter-present.component';
import { ErrorOutlookComponent } from './model-present/error-outlook/error-outlook.component';


@NgModule({
  declarations: [ModelPageComponent, ModelSelectComponent, ModelPresentComponent, FilterPresentComponent, ErrorOutlookComponent],
  imports: [
    CommonModule,
    NzProgressModule,
    NzGridModule,
    NzSelectModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ],
  exports: [ModelPageComponent, ModelPresentComponent]
})
export class ModelModule { }
