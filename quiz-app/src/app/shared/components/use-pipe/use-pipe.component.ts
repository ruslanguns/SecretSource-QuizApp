import { Component, Input, PipeTransform } from '@angular/core';


// Inspiried by https://stackoverflow.com/a/61820240/8966778
@Component({
  selector: 'app-use-pipe',
  template: `
    <span [innerHTML]="transformedText()"></span>
  `
})
export class UsePipeComponent {
  
  @Input() pipeProvider?: PipeTransform;
  @Input() pipeArgs?: Array<any>;
  @Input() textToFormat?: string;

  transformedText(): string|null {
    return this.pipeProvider ? this.pipeProvider?.transform(this.textToFormat, this.pipeArgs) : this.textToFormat
  }
}
