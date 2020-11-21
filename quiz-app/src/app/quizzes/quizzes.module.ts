import { NgModule } from '@angular/core';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [QuizzesRoutingModule.components],
  imports: [
    SharedModule,
    QuizzesRoutingModule
  ]
})
export class QuizzesModule { }
