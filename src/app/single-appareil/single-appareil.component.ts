import { Component, OnInit } from '@angular/core';
import { appareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {
  name: string =  'defaultName';
  status: string = 'defaultStatus';
  
  constructor(private appareilService: appareilService, private route: ActivatedRoute) { }

  ngOnInit() {
  const id  = this.route.snapshot.params['id'];
  this.name = this.appareilService.getAppareilById(+id).name;
  this.status = this.appareilService.getAppareilById(+id).status;
  }

}
