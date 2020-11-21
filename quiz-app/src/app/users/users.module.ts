import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [UsersRoutingModule.components],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
