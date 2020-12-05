import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { AuthGuard } from '../core/guards';
import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: QuizzesComponent,
    children: [
      {
        path: '',
        component: QuizzesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class QuizzesRoutingModule {
  static components = [
    QuizzesComponent,
    QuizzesListComponent
  ];
}
