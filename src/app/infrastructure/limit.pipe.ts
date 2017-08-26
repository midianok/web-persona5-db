import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform{
  transform(value: Array<any>, limit: number): Array<any> {
    if (limit === 0)
      return value;
    else
      return value.slice(0, limit);
  }
}
