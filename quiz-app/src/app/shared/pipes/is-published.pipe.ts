import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPublished'
})
export class IsPublishedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return !value ? 'Unpublished' : value === 1 ? 'published' : 'Unknown'
  }

}
