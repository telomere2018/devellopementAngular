import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
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
selectorFile : File = null;
 onEvent(event){
   alert('event');
   alert(event);
   console.log('event');
   console.log(event);
   alert(this.selectorFile);
   //this.selectorFile = <File>event.target.files[0];
 }


  ngOnInit() {
  }
onUpload(){
alert('onupload' + this.selectorFile.name);
  let fd = new FormData();
  fd.append('file',this.selectorFile, this.selectorFile.name);
  this.http.post('/route/sample/file',fd)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/appareils']);
        }, (err) => {
          console.log('error ', err);
        }
      );
  }

  saveSample() {
    this.http.post('/route/sample', this.telomere)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/appareils']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}




