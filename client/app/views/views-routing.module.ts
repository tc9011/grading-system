import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalComponent } from '../layout/global/global.component';
import { PassportComponent } from '../layout/passport/passport.component';
import { LoginComponent } from './passport/login/login.component';
import { RegisterComponent } from './passport/register/register.component';
import { AuthGuardLogin } from '../core/auth/auth-guard-login.service';
import { Exception500Component } from './exception/500/exception500.component';
import { Exception404Component } from './exception/404/exception404.component';
import { Exception403Component } from './exception/403/exception403.component';
import { SelfEvaluationComponent } from './self-evaluation/self-evaluation.component';
import { MutualEvaluationComponent } from './mutual-evaluation/mutual-evaluation.component';
import { AddAndEditComponent } from './mutual-evaluation/add-and-edit/add-and-edit.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalComponent,
    canActivate: [AuthGuardLogin],
    canActivateChild: [AuthGuardLogin],
    children: [
      {
        path: '',
        redirectTo: 'selfevaluation',
        pathMatch: 'full'
      },
      {
        path: 'selfevaluation',
        component: SelfEvaluationComponent
      },
      {
        path: 'mutualevaluation',
        component: MutualEvaluationComponent
      },
      {
        path: 'mutualevaluation/:year/:month/:workNumber',
        component: AddAndEditComponent
      }
    ]
  },
  {
    path: 'passport',
    component: PassportComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ],
  },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
