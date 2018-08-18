import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalComponent } from './global/global.component';

const LAYOUTCOMPONENT = [
  HeaderComponent,
  SidebarComponent,
  GlobalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [...LAYOUTCOMPONENT],
  exports: [...LAYOUTCOMPONENT],
  providers: []
})
export class LayoutModule { }
