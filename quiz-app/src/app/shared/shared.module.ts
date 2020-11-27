import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormDirective, UserRoleDirective, AuthResourceDirective } from './directives';

import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';

const components = [
  CardComponent,
  ListComponent,
  FormDirective,
  UserRoleDirective,
  AuthResourceDirective
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
