import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsComponent } from './questions.component';


const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: QuestionsListComponent
      },
      {
        path: ':id',
        component: QuestionItemComponent
      }
    ]
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
    QuestionsComponent,
    QuestionsListComponent,
    QuestionItemComponent
  ];
}
