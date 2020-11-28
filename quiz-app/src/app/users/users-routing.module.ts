import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UsersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UsersRoutingModule {
  static components = [
    UsersComponent
  ];
}
