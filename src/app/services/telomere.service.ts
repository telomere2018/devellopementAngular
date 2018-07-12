import { AppareilComponent } from '../appareil/appareil.component';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TelomereAddComponent } from '../telomere-add/telomere-add.component';

@Injectable()
export class telomereService {

    appareilsSubject = new Subject<any[]>();
    
  private  telomeres =[
        { 
          fileName : 'telomere1',
          author : 'éteint',
            year: 2018,
            status : 'allumé',
            id : 1
        },
        {
          fileName : 'telomere2',
          author : 'allumé',
          status : 'allumé',
          year : 2018,
          id : 2

        },
        {
          fileName : 'telomere infectée',
          author : 'allumé',
          status : 'éteint',
          year : 2018,
          id : 3

        }
  
    ]
    constructor(private httpClient: HttpClient){

    }
    

ngOnInit(){
   
}
}