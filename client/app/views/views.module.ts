import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './passport/register/register.component';
import { LoginComponent } from './passport/login/login.component';
import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PassportService } from './passport/services/passport.service';
import { Exception403Component } from './exception/403/exception403.component';
import { Exception404Component } from './exception/404/exception404.component';
import { Exception500Component } from './exception/500/exception500.component';
import { ExceptionComponent } from './exception/exception/exception.component';
import { SelfEvaluationComponent } from './self-evaluation/self-evaluation.component';
import { MutualEvaluationComponent } from './mutual-evaluation/mutual-evaluation.component';
import { LayoutModule } from '../layout/layout.module';
import { SelfEvaluationService } from './self-evaluation/services/self-evaluation.service';
import { MutualEvaluationService } from './mutual-evaluation/services/mutual-evaluation.service';
import { AddAndEditComponent } from './mutual-evaluation/add-and-edit/add-and-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ViewsRoutingModule,
    LayoutModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    Exception403Component,
    Exception404Component,
    Exception500Component,
    ExceptionComponent,
    SelfEvaluationComponent,
    MutualEvaluationComponent,
    AddAndEditComponent
  ],
  providers: [PassportService, SelfEvaluationService, MutualEvaluationService]
})
export class ViewsModule { }
