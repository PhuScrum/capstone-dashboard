import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module'
import { ModelModule } from './model/model.module';
import { ProfileModule } from './profile/profile.module'
import { VersioningModule } from './versioning/versioning.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en'
import { NgZorroAntdModule } from './ng-zorro-antd.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule,
    VersioningModule,
    NavbarModule,
    ModelModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
