import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleManageComponent } from './people-manage/people-manage.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleManageRoutingModule { }
