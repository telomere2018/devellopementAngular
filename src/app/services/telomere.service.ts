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
    saveAppareilsToServer(name: string, description: string) {
        

        this.httpClient
          .put('route/telomere', this.telomeres)
          .subscribe(
            () => {
              console.log('Enregistrement terminé !');
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }
    getAppareilsFromServer() {
        

        this.httpClient
          .get<any[]>('/route')
          .subscribe(
            (response) => {
              this.telomeres = response;
              console.log(response);
              this.emitAppareilSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }
    emitAppareilSubject(){
        this.appareilsSubject.next(this.telomeres.slice());
    }
    getAppareilById(id: number){
       const appareil = this.telomeres.find(
            (s) =>{
                return s.id === id;
            }
        )
        return appareil;
    }
switchOnAll() {
    for(let appareil of this.telomeres)
    {
    appareil.status='allumé';
    }
    this.emitAppareilSubject();
}
switchOffAll(){
    for(let appareil of this.telomeres)
    {
        appareil.status='éteint';
    }
    this.emitAppareilSubject();
}
switchOnOne(i: number){
    this.telomeres[i].status = 'allumé';
    this.emitAppareilSubject();
}
switchOffOne(i: number){
    this.telomeres[i].status = 'éteint';
    this.emitAppareilSubject();

}
addAppareil(name: string, status: string) {

    const appareilObject = {

      id: 0,

      fileName: '',

      status: '',
      author: '',
      year : 0

    };

    appareilObject.fileName = name;

    appareilObject.status = status;

    appareilObject.id = this.telomeres[(this.telomeres.length - 1)].id + 1;

    this.telomeres.push(appareilObject);

    this.emitAppareilSubject();

}
ngOnInit(){
   
}
}