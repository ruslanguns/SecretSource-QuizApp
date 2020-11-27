import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards';
import { QuestionsComponent } from './questions.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: QuestionsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsRoutingModule {
  static components = [
    QuestionsComponent
  ];
}
