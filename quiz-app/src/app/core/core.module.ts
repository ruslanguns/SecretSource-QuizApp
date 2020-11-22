import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { AuthService } from './services';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';

const components = [
  LayoutComponent,
  NavbarComponent,
  SidenavComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [AuthService],
  exports: [
    ...components
  ]
})
export class CoreModule { }
