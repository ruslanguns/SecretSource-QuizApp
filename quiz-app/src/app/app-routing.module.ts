import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './pages/error/error404.component';
import { Role } from './shared/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.Admin,
        Role.Player
      ]
    }
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'quizzes',
    canLoad: [AuthGuard],
    data: {
      roles: [
        Role.Player
      ]
    },
    loadChildren: () =>
      import('./quizzes/quizzes.module').then((m) => m.QuizzesModule),
  },
  {
    path: 'questions',
    canLoad: [AuthGuard],
    data: {
      roles: [
        Role.Admin
      ]
    },
    loadChildren: () =>
      import('./questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: 'users',
    canLoad: [AuthGuard],
    data: {
      roles: [
        Role.Admin
      ]
    },
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  { 
    path: '**',
    component: Error404Component,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    DashboardComponent,
    Error404Component
  ]
}
