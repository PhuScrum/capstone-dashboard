import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ModelsComponent } from './models/models.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';

@NgModule({
  declarations: [ProfilePageComponent, ModelsComponent, DatasetsComponent, ProfileSummaryComponent],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
