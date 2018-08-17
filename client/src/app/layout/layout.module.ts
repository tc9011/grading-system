import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const LAYOUTCOMPONENT = [
  HeaderComponent,
  SidebarComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...LAYOUTCOMPONENT],
  exports: [...LAYOUTCOMPONENT],
})
export class LayoutModule { }
