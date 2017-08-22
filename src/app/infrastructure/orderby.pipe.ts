import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {
  transform(value: Array<any>, by: string, desc?: string): any {
    if (desc !== null && desc === '+'){
      return value.sort((a, b) => {
        if (a[by] > b[by]){
          return 1;
        }
        if (a[by] < b[by]){
          return -1;
        }
        return 0;
      });
    }

    return value.sort((a, b) => {
      if (a[by] > b[by]){
        return -1;
      }
      if (a[by] < b[by]){
        return 1;
      }
      return 0;
    });
  }
}
