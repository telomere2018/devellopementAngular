import { Component, OnInit } from '@angular/core';
import { appareilService } from '../services/appareil.service';
@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = true;
 /*lastUpdate =
 new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => { resolve(date);
      }, 2000
    );
  });*/
  appareils : any[];

  ngOnInit(){
    this.appareils = this.appareilService.appareils;
        }
  constructor(private appareilService : appareilService) {
    this.isAuth = false;
  /*  setTimeout(
      () => {
        this.isAuth = false;
        alert("test timeout");
      }, 4000
    );*/
  }
  onAllumer(i) {
    
    this.appareilService.switchOnOne(i);
  }
  onEteindre(i) {
    if(confirm('Etes vous sur de vouloir éteindre tous vos appareils ?')){
      this.appareilService.switchOffOne(i);
    }else {
     return  null; 
    }
    
  }
  onAllume() {
    this.appareilService.switchOnAll();
  }
  onEteind(){
    this.appareilService.switchOffAll();
  }

}
