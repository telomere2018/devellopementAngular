import { Component } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth = true;
  lastUpdate =
  new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => { resolve(date);
      }, 2000
    );
  });
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
  


  constructor() {
    setTimeout(
      () => {
        this.isAuth = false;
        alert("test timeout");
      }, 4000
    );
  }
  onAllumer() {
    
    console.log('On allume tout !');
  }
  
}
