import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { telomereService } from '../services/telomere.service';
@Component({
  selector: 'app-telomere-add',
  templateUrl: './telomere-add.component.html',
  styleUrls: ['./telomere-add.component.scss']
})
export class TelomereAddComponent implements OnInit {

  constructor(private router: Router, private telomereService: telomereService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {

    const name = form.value['name'];

    const status = form.value['status'];

   this.telomereService.saveAppareilsToServer(name, status);

    this.router.navigate(['/appareils']);


}

}




