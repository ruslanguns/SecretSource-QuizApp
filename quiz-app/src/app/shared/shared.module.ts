import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { FormDirective } from './directives/form.directive';

const components = [
  CardComponent,
  ListComponent,
  FormDirective,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...components
  ]
})
export class SharedModule { }
