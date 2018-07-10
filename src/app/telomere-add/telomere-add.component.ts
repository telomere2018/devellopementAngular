import { Component, OnInit, ViewEncapsulation, ElementRef , Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { telomereService } from '../services/telomere.service';


import { HttpClient } from '@angular/common/http';
const URL = "http//localhost:3001/uploads"
@Component({
  selector: 'app-telomere-add',
  templateUrl: './telomere-add.component.html',
  styleUrls: ['./telomere-add.component.scss']
})


export class TelomereAddComponent implements OnInit {
  @Input() fileName: string ;
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'file'});
  //This is the default title property created by the angular cli. Its responsible for the app works
  constructor(private http:HttpClient, private router: Router,
     private telomereService: telomereService,
     private el: ElementRef) { }

  @Input() telomere = {
  fileName: ""
  };
  selectorFile : File = null;

  onEvent(event){

  
   this.selectorFile = <File>event.target.files[0];
   
  this.fileName=this.selectorFile.name;
 
   let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
  alert( 'input element ' + inputEl.files[0]);
  alert('inputElement' + inputEl);
 }


  ngOnInit() {
     //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
     this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
     //overide the onCompleteItem property of the uploader so we are 
     //able to deal with the server response.
     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          console.log("ImageUpload:uploaded:", item, status, response);
  }
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
change(e) {
  let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
  console.log( 'input element' , inputEl);
  //get the total amount of files attached to the file input.
      let fileCount: number = inputEl.files.length;

}

remplir() {
  alert('remplir' + this.selectorFile);
}
}




