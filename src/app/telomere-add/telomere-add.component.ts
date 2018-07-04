import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { telomereService } from '../services/telomere.service';


import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-telomere-add',
  templateUrl: './telomere-add.component.html',
  styleUrls: ['./telomere-add.component.scss']
})
export class TelomereAddComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router, private telomereService: telomereService) { }

  telomere = {};

 

  ngOnInit() {
  }

  saveSample() {
    this.http.post('/route/sample', this.telomere)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/appareils', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}




