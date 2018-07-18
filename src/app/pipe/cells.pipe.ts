import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cells'
})
export class CellsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
