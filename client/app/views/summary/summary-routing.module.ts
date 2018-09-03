import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfSummaryComponent } from './self-summary/self-summary.component';
import { MutualSummaryComponent } from './mutual-summary/mutual-summary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'self',
    pathMatch: 'full'
  },
  {
    path: 'self',
    component: SelfSummaryComponent
  },
  {
    path: 'mutual',
    component: MutualSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
