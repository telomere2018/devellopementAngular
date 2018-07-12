import { AppareilComponent } from '../appareil/appareil.component';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TelomereAddComponent } from '../telomere-add/telomere-add.component';
import { FileDetector } from 'protractor';
import { ReadVarExpr } from '@angular/compiler';





@Injectable()
export class readFileService {
    constructor() {

    }

    readOneFile(file: File, nombre: number) {
        let reader = new FileReader();
        reader.readAsText(file);
       var text;
       // ici une fonction anonyme
        reader.onload = () => {
            // this 'text' is the content of the file typeof === string
            text = reader.result;

            var tab = [];
            var count: number = 0;

            var re = /\s+/;

            tab = text.split(re);
 
            for (let j = 0; j < nombre; j++) {
                console.log("tab" + j + "\n montab[" + j + "] \n" + tab[j]);
            }


        }
    }


    ngOnInit() {
    }

}




