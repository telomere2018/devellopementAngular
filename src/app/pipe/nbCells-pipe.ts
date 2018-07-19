import {Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'nbCellsPipe'
})
export class nbCellsPipe {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value: any, args1? :any) : any {
    // ES6 array destructuring
    let [minCells] = args1 //undefined
    
    return value.filter(telomere => {
        let g=Number(telomere.nbCells)
        


        console.log(g<=args1);
   // return   Number(telomere.nbCells) <= args1 ;
    return g<=args1;
    });
  }

}