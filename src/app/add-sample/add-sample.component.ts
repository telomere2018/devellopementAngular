import {  OnInit } from '@angular/core';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
const URL = "http//localhost:3001/uploads"
@Component({
  selector: 'app-add-sample',
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.scss']
})
export class AddSampleComponent implements OnInit {

  telomere= {};
  ngOnInit()
  {}

  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient,
              private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      fileName: ['', Validators.required],
      author: ['', Validators.required],
      organisme: ['', Validators.required],
      year: ['', Validators.required],
      
      file: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let fileInput = event.target.files[0];
      this.form.get('file').setValue(fileInput);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('fileName', this.form.get('fileName').value);
    input.append('author', this.form.get('author').value);
    input.append('organisme', this.form.get('organisme').value);
    input.append('year', this.form.get('year').value);
    input.append('file', this.form.get('file').value);
    return input;
  }

  onSubmit() {
    const fd = this.prepareSave();
    this.loading = true;
    this.http.post('/route/sample/file',fd)
      .subscribe(res => {
        console.log(res);
          let id = res['_id'];
          this.router.navigate(['/add-sample']);
        }, (err) => {
          console.log('error ', err);
        }
      );
  }

  clearFile() {
    this.form.get('file').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}


