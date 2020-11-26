import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './pages/error/error404.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./quizzes/quizzes.module').then((m) => m.QuizzesModule),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  { path: '**', component: Error404Component, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    DashboardComponent,
    Error404Component
  ]
}
