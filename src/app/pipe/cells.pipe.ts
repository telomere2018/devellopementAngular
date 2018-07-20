import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { oneFileService } from '../services/one-file.service';

@Pipe({
  name: 'cells'
})

export class CellsPipe implements PipeTransform, OnInit {
  
  telomereSubjectCell = new Subject<any[]>();



  telomeres : any[] = [];
  constructor(private onFileService: oneFileService) 
  {}
  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value: any, args?: any): any {
    // ES6 array destructuring
    let [minCells] = args
    this.telomeres = value;

    this.telomeres = value;

    return value.filter(telomere => {

     
        return telomere.originalname == args;
      

    });
  }
ngOnInit(){
  this.test();

}
emitTelomereSubject(){
  this.telomereSubjectCell.next(this.telomeres.slice());
  this.onFileService.telomeres = this.telomeres;
}
test()
{
  this.onFileService.subscription = this.telomereSubjectCell.subscribe(
    (telomeres: any[])=>{
      this.telomeres = telomeres;
    }
  );
  this.emitTelomereSubject();
}

}
