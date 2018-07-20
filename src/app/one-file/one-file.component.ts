import { Component, OnInit, Input } from '@angular/core';
import { Pipe } from '@angular/core';
@Component({
  selector: 'app-one-file',
  templateUrl: './one-file.component.html',
  styleUrls: ['./one-file.component.scss']
})
export class OneFileComponent implements OnInit {
@Input() originalname: string;
@Input() index: number;
@Input() id:string;
@Input() nbCells : number;

  constructor() { }

  ngOnInit() {
  }

}
