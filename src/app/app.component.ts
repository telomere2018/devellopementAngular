import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { appareilService } from "./services/appareil.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = true;
  lastUpdate =
  new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => { resolve(date);
      }, 2000
    );
  });
  appareils : any[];

  ngOnInit(){
    this.appareils = this.appareilService.appareils;
        }
  constructor(private appareilService : appareilService) {
    
    setTimeout(
      () => {
        this.isAuth = false;
        alert("test timeout");
      }, 4000
    );
  }
  onAllumer() {
    
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    if(confirm('Etes vous sur de vouloir éteindre tous vos appareils ?')){
      this.appareilService.switchOffAll();
    }else {
     return  null; 
    }
    
  }
  
}
