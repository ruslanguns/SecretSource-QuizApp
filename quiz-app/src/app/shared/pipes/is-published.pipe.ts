import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPublished'
})
export class IsPublishedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value === 'false' || value === false
      ? 'Unpublished'
      : value === 'true' || value === true
        ? 'Published'
        : 'Unknown'
  }

}
