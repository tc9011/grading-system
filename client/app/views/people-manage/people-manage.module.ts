import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleManageRoutingModule } from './people-manage-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { PeopleManageComponent } from './people-manage/people-manage.component';
import { PeopleManageService } from './services/people-manage.service';
import { PeopleManagePipe } from './pipes/people-manage.pipe';

@NgModule({
  imports: [
    CommonModule,
    PeopleManageRoutingModule,
    LayoutModule,
    SharedModule,
  ],
  declarations: [PeopleManageComponent, PeopleManagePipe],
  providers: [PeopleManageService]
})
export class PeopleManageModule { }
