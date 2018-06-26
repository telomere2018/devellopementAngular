import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { appareilService } from '../services/appareil.service';

@Component({
  selector: 'app-edit-appareil-component',
  templateUrl: './edit-appareil-component.component.html',
  styleUrls: ['./edit-appareil-component.component.scss']
})
export class EditAppareilComponentComponent implements OnInit {

  
  defaultOnOff = 'éteint';
  appareilService : appareilService;
  router : Router; 
  constructor( appareilService: appareilService, router: Router) {
    this.router = router;
    this.appareilService = appareilService;
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const name = form.value['name'];

    const status = form.value['status'];

   this.appareilService.addAppareil(name, status);

    this.router.navigate(['/appareils']);


}
}