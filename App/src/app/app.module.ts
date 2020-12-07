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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { NzAnchorModule } from 'ng-zorro-antd/anchor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,

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
    NzButtonModule,
    NzDropDownModule,
    NgZorroAntdModule,
    // NzAnchorModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
