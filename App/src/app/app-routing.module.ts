import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelPageComponent } from './model/model-page/model-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { VersioningPageComponent } from './versioning/versioning-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component'

const routes: Routes = [
  { path: '', component: ModelPageComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent, pathMatch: 'full' },
  { path: 'versioning/dataset', component: VersioningPageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
