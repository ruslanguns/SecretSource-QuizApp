import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';

const components = [
  CardComponent,
  ListComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ...components
  ]
})
export class SharedModule { }
