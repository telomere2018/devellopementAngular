import { Component, OnInit, ViewEncapsulation, ElementRef, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { telomereService } from '../services/telomere.service';
import { readFileService } from '../services/read-file.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const URL = "http//localhost:3001/uploads"
@Component({
  selector: 'app-telomere-add',
  templateUrl: './telomere-add.component.html',
  styleUrls: ['./telomere-add.component.scss']
})


export class TelomereAddComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @Input() originalname: string;
  @Input() organisme: string;
  @Input() date_edition: string;
  @Input() nbCells: string;
  @Input() protocole: string;
  @Input() author: string;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file' });
  @ViewChild('fileInput') fileInput: ElementRef;
  //This is the default title property created by the angular cli. Its responsible for the app works
  constructor(private http: HttpClient, private router: Router,
    private telomereService: telomereService,
    private fb: FormBuilder,
    private el: ElementRef,
    private readFile: readFileService) {

  }

  telomere = {}

  selectorFile: File = null;

  onEvent(event) {


    this.selectorFile = <File>event.target.files[0];

    this.originalname = this.selectorFile.name;
    console.log('file ', this.selectorFile);
    // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');

    //nombre is the number of word
    let reader = new FileReader();
    reader.readAsText(this.selectorFile);
    var result;
    // ici une fonction anonyme
    result = reader.onload = () => {
      // this 'text' is the content of the file typeof === string
      // var text;
      console.log( 'this' , this);

      var text = reader.result;



      var tab = [];
      var count: number = 0;

      var re = /\s+/;

      tab = text.split(re, 20);

      for (let j = 0; j < 20; j++) {
        console.log("tab" + j + "\n montab[" + j + "] \n" + tab[j]);
      }
      //let nombre: number = 20;

      //this.readFile.readOneFile(this.selectorFile, nombre);
      console.log(' tab ' + tab);
      this.nbCells = tab[12];
      this.date_edition = tab[15];
      this.protocole = tab[4];

    }


  };


  clearFile() {
    this.form.get('file').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    //this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    //this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    //  console.log("ImageUpload:uploaded:", item, status, response);
    //}
  }

  onUpload() {
    
    let fd = new FormData();
    fd.append('file', this.selectorFile);
    fd.append('organisme', this.organisme);
    fd.append('protocole', this.protocole);
    fd.append('date_edition', this.date_edition);
    fd.append('nbCells', this.nbCells);
    fd.append('author', this.author);

  

    this.http.post('/route/sample/file', fd)
      .subscribe(res => {
        console.log(res);
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
    console.log('input element', inputEl);
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;

  }

  remplir() {
    alert('remplir' + this.selectorFile);
  }
}




