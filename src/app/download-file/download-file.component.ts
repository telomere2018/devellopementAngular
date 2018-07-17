import { Component, OnInit, ViewEncapsulation, ElementRef, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Telomere } from '../../../models/Telomere';
import { TelomereAddComponent } from '../telomere-add/telomere-add.component';
@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})



export class DownloadFileComponent implements OnInit {



  constructor(private http: HttpClient
    , private router: Router) { }

 telomeres : Telomere[] = [];

  ngOnInit() {
    this.download();
  }

  download() {
    this.http.get('/route/sample/download')
      .subscribe(res => {
        console.log('Array avant res? ' + typeof(this.telomeres));     
      this.telomeres = <Telomere[]>res;
        console.log('sample ' , this.telomeres);
        console.log('Array ? ' + typeof(this.telomeres));
      }, (err) => {
        console.log('error dans le .ts ', err);
      }
      );
  }

}
