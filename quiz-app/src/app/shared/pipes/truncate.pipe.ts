import { SlicePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, limit: number = 35): unknown {
    return value.length > limit
      ? new SlicePipe().transform(value, 0, limit - 3).concat('...')
      : value
  }

}
