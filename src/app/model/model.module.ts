import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelPageComponent } from './model-page/model-page.component';
import { ModelSelectComponent } from './model-select/model-select.component';
import { ModelPresentComponent } from './model-present/model-present.component';



@NgModule({
  declarations: [ModelPageComponent, ModelSelectComponent, ModelPresentComponent],
  imports: [
    CommonModule
  ],
  exports: [ModelPageComponent]
})
export class ModelModule { }
