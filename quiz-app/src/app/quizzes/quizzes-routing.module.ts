import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { AuthGuard } from '../core/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: QuizzesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class QuizzesRoutingModule {
  static components = [
    QuizzesComponent
  ];
}
