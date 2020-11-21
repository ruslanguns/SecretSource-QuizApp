import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { AuthService } from './services';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [AuthService],
})
export class CoreModule { }
