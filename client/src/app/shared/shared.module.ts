import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const SHAREDMODULE = [
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...SHAREDMODULE],
  exports: [...SHAREDMODULE]
})
export class SharedModule { }
