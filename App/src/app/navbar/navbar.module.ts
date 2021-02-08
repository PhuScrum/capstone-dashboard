import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TopNavComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  exports: [TopNavComponent]
})
export class NavbarModule { }
