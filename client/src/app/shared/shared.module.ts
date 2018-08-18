import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const SHAREDMODULE = [
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  NgZorroAntdModule,
  CommonModule
];

@NgModule({
  imports: [SHAREDMODULE],
  declarations: [],
  exports: [SHAREDMODULE]
})
export class SharedModule { }
