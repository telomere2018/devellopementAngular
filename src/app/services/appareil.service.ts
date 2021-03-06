import { AppareilComponent } from '../appareil/appareil.component';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class appareilService {

    appareilsSubject = new Subject<any[]>();

  private  appareils =[
        { 
          name : 'population saine',
          status : 'éteint',
            id: 1
        },
        {
          name : 'population test',
          status : 'allumé',
          id : 2

        },
        {
          name : 'population infectée',
          status : 'allumé',
          id : 3

        }
  
    ]
    constructor(private httpClient: HttpClient, private router: Router){

    }
    saveAppareilsToServer() {
        this.httpClient
          .put('route', this.appareils)
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
              this.appareils = response;
              console.log(response);
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