import { NgModule } from '@angular/core';
import { QuestionsRoutingModule } from './questions-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    QuestionsRoutingModule.components
  ],
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
