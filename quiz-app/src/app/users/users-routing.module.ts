import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {
  static components = [
    UsersComponent,
    UsersListComponent
  ];
}
