import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { ModelPageComponent } from './model-page/model-page.component';
import { ModelSelectComponent } from './model-select/model-select.component';
import { ModelPresentComponent } from './model-present/model-present.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FilterPresentComponent } from './model-present/filter-present/filter-present.component';
import { ErrorOutlookComponent } from './model-present/error-outlook/error-outlook.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MetricsComparisionComponent } from './model-present/metrics-comparision/metrics-comparision.component';

@NgModule({
  declarations: [
    ModelPageComponent,
    ModelSelectComponent,
    ModelPresentComponent,
    FilterPresentComponent,
    ErrorOutlookComponent,
    MetricsComparisionComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzProgressModule,
    NzGridModule,
    NzSelectModule,
    NzTableModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  exports: [
    ModelPageComponent,
    ModelPresentComponent,
    MetricsComparisionComponent
  ]
})

export class ModelModule { }
