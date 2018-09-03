import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SelfSummaryComponent } from './self-summary/self-summary.component';
import { MutualSummaryComponent } from './mutual-summary/mutual-summary.component';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { SummaryService } from './services/summary.service';

@NgModule({
  imports: [
    CommonModule,
    SummaryRoutingModule,
    LayoutModule,
    SharedModule
  ],
  declarations: [SelfSummaryComponent, MutualSummaryComponent],
  providers: [SummaryService]
})
export class SummaryModule { }
