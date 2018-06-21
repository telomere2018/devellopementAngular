export class appareilService {
    appareils =[
        { 
          name : 'machine à laver',
          status : 'éteint'
        },
        {
          name : 'frigo',
          status : 'allumé'
        },
        {
          name : 'ordinateur',
          status : 'allumé'
        }
  
    ]
switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
}
switchOffAll() {
    for( let appareil of this.appareils){
        appareil.status = 'éteint';
    }
}
}