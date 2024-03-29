import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { AuthService, LoadingService, QuestionsService, QuizService, StoreService, UsersService } from './services';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import interceptors from './interceptors';

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
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    StoreService,
    QuestionsService,
    UsersService,
    QuizService,
    LoadingService,
    interceptors,
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
