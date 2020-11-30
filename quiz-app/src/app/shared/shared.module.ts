import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormDirective, UserRoleDirective, AuthResourceDirective } from './directives';

import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { ModalComponent } from './components/modal/modal.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { UsePipeComponent } from './components/use-pipe/use-pipe.component';
import { IsPublishedPipe } from './pipes/is-published.pipe';
import { LoadingComponent } from './components/loading/loading.component';


const components = [
  CardComponent,
  ListComponent,
  ModalComponent,
  QuestionFormComponent,
  UsePipeComponent,
  TableCrudComponent,
  LoadingComponent,
  FormDirective,
  UserRoleDirective,
  AuthResourceDirective,
  IsPublishedPipe
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...components
  ],
})
export class SharedModule { }
