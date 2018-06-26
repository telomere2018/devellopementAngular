import { AppareilComponent } from '../appareil/appareil.component';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class appareilService {

    appareilsSubject = new Subject<any[]>();

  private  appareils =[
        { 
          name : 'machine à laver',
          status : 'éteint',
            id: 1
        },
        {
          name : 'frigo',
          status : 'allumé',
          id : 2

        },
        {
          name : 'ordinateur',
          status : 'allumé',
          id : 3

        }
  
    ]
    constructor(private httpClient: HttpClient){

    }
    saveAppareilsToServer() {
        this.httpClient
          .put('https://telomere2018-e88b8.firebaseio.com/appareils.json', this.appareils)
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
          .get<any[]>('https://telomere2018-e88b8.firebaseio.com/appareils.json')
          .subscribe(
            (response) => {
              this.appareils = response;
              this.emitAppareilSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }
    emitAppareilSubject(){
        this.appareilsSubject.next(this.appareils.slice());
    }
    getAppareilById(id: number){
       const appareil = this.appareils.find(
            (s) =>{
                return s.id === id;
            }
        )
        return appareil;
    }
switchOnAll() {
    for(let appareil of this.appareils)
    {
    appareil.status='allumé';
    }
    this.emitAppareilSubject();
}
switchOffAll(){
    for(let appareil of this.appareils)
    {
        appareil.status='éteint';
    }
    this.emitAppareilSubject();
}
switchOnOne(i: number){
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
}
switchOffOne(i: number){
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();

}
addAppareil(name: string, status: string) {

    const appareilObject = {

      id: 0,

      name: '',

      status: ''

    };

    appareilObject.name = name;

    appareilObject.status = status;

    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);

    this.emitAppareilSubject();

}
ngOnInit(){
   
}
}