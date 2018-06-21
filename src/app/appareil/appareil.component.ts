import { Component, Input, OnInit } from '@angular/core';
import { appareilService } from '../services/appareil.service';
@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName: string ;
  @Input() appareilStatus : string;
  @Input() index : number;
  

  constructor(private appareilService : appareilService) { }
  getColor() {
    if( this.getStatus() == "allumé")
    {
      return "green";
    }
  }
  ngOnInit() {
  }
  getStatus() {
    return this.appareilStatus;
  }
  onSwitch() {
    if(this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    }else if(this.appareilStatus === 'éteint' {
      this.appareilService.switchOnOne(this.index);

    }
  }

}
