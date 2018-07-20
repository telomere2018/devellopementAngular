import { Component, OnInit, ViewEncapsulation, ElementRef, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Telomere } from '../../../models/Telomere';
import { TelomereAddComponent } from '../telomere-add/telomere-add.component';
import { nbCellsPipe } from '../pipe/nbCells-pipe';
import { oneFileService } from '../services/one-file.service'
import { Subscription } from 'rxjs/Subscription';
import { CellsPipe } from '../pipe/cells.pipe';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})



export class DownloadFileComponent implements OnInit {


  

  constructor(private http: HttpClient
    , private router: Router,
 private oneFileService: oneFileService)
   { }
   nbPipe: nbCellsPipe;
   cellsPipe: CellsPipe;
  subscription: Subscription;
  originalname:string = 'P3-PL2.TXT';
  sliderValue: number = 11000;
  telomeres: Telomere[] = [];

  telomeresSave: Telomere[] = [];
  value: any;
  

  ngOnInit() {
    this.download();

    this.subscription = this.oneFileService.telomereSubject.subscribe(
      (telomeresSave: any[]) => {
        this.telomeresSave = telomeresSave;
      });

      this.oneFileService.emitTelomereSubject();
      this.nbPipe = new nbCellsPipe();
      this.cellsPipe = new CellsPipe(this.oneFileService);

  }

  download() {

    this.http.get('/route/sample/download')
      .subscribe(res => {
        console.log('Array avant res? ' + typeof (this.telomeres));
        this.telomeres = <Telomere[]>res;

      }, (err) => {
        console.log('error dans le .ts ', err);
      });
  }
  save(){

    console.log('change  change');
    this.telomeresSave = this.nbPipe.transform(this.telomeres,this.sliderValue);
    this.telomeresSave = this.cellsPipe.transform(this.telomeresSave,this.originalname);
    alert(" files are download ");
    alert(this.telomeresSave[0].fileName);
   console.log(this.telomeresSave);

    this.http.get('route/file/' + this.telomeresSave[0].fileName).subscribe(res=>{ 
console.log(res);
    });

    

  }
  create()
  {

  }

}
