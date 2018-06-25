import { AppareilComponent } from '../appareil/appareil.component';

export class appareilService {
    appareils =[
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
}
switchOffAll(){
    for(let appareil of this.appareils)
    {
        appareil.status='éteint';
    }
}
switchOnOne(i){
    this.appareils[i].status = 'allumé';
}
switchOffOne(i){
    this.appareils[i].status = 'éteint';
}
}