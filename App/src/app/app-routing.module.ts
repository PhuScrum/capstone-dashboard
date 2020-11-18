import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelPageComponent } from './model/model-page/model-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: ModelPageComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
