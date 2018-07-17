import { Component, OnInit, ViewEncapsulation, ElementRef, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})



export class DownloadFileComponent implements OnInit {



  constructor(private http: HttpClient
    , private router: Router) { }

  samples = {};

  ngOnInit() {
    this.download();
  }

  download() {
    this.http.get('/route/sample/download')
      .subscribe(res => {
        console.log('res[0].fileName ' , res[0].fileName + " , " ,res);
      this.samples=res;
        console.log('sample ' , this.samples);
        
      }, (err) => {
        console.log('error dans le .ts', err);
      }
      );
  }

}
