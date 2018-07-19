import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cells'
})

export class CellsPipe implements PipeTransform {
  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value: any, args?: any): any {
    // ES6 array destructuring
    let [minCells] = args
    console.log('args cells' + args);
    console.log(value);
    return value.filter(telomere => {

      /*if (args == '') {
        return true;
      }*/

     console.log("true or false " + (telomere.originalname===args));
     console.log("true or false " + (telomere.originalname==args));
        return telomere.originalname == args;
      

    });
  }

}
