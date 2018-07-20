import { AppareilComponent } from '../appareil/appareil.component';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class oneFileService {

    telomereSubject = new Subject<any[]>();

    public telomeres = [];
      
    subscription : Subscription;
   
    constructor(private httpClient: HttpClient, private router: Router){

    }

    saveAppareilsToServer() {
        this.httpClient
          .put('route', this.telomeres)
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
              this.emitTelomereSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }
    emitTelomereSubject(){
        this.telomereSubject.next(this.telomeres.slice());
        console.log(this.telomeres);
    }

    getAppareilById(id: number){
       const telomere = this.telomeres.find(
            (s) =>{
                return s.id === id;
            }
        )
        return telomere;
    }
switchOnAll() {
    for(let appareil of this.telomeres)
    {
    appareil.status='allumé';
    }
    this.emitTelomereSubject();
}

switchOnOne(i: number){
    this.telomeres[i].status = 'allumé';
    this.emitTelomereSubject();
}
switchOffOne(i: number){
    this.telomeres[i].status = 'éteint';
    this.emitTelomereSubject();

}
addAppareil(name: string, status: string) {

    const appareilObject = {

      id: 0,

      name: '',

      status: ''

    };

    appareilObject.name = name;

    appareilObject.status = status;

    appareilObject.id = this.telomeres[(this.telomeres.length - 1)].id + 1;

    this.telomeres.push(appareilObject);

    this.emitTelomereSubject();

}
ngOnInit(){

    this.subscription = this.telomereSubject.subscribe(
        (telomeresSave: any[]) => {
            this.telomeres = telomeresSave;
          });
    
          this.emitTelomereSubject();
}

}