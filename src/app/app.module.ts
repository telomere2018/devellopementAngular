import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditAppareilComponentComponent } from './edit-appareil-component/edit-appareil-component.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './new-user/new-user.component';
import { TelomereAddComponent } from './telomere-add/telomere-add.component';
import { telomereService } from './services/telomere.service';
import { InputFileModule } from 'ngx-input-file';
import { InputFileComponent } from './input-file/input-file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FileSelectDirective } from 'ng2-file-upload';
const appRoutes: Routes = [
  { path: 'upload', canActivate: [AuthGuard], component: UploadFileComponent },
  { path: 'input-file', canActivate: [AuthGuard], component: InputFileComponent },
  { path: 'appareils', canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: 'appareils/:id', canActivate: [AuthGuard], component: SingleAppareilComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'edit', canActivate: [AuthGuard], component: EditAppareilComponentComponent },
  { path: 'users', canActivate: [AuthGuard], component: UserListComponent},
  { path: 'user', component: NewUserComponent },
  { path: 'telomere-add', canActivate: [AuthGuard], component: TelomereAddComponent},
  { path: '',canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: '**', component: FourOhFourComponent }
  
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponentComponent,
    UserListComponent,
    NewUserComponent,
    TelomereAddComponent,
    InputFileComponent,
    UploadFileComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    InputFileModule 
  ],
  providers: [
    appareilService,
    AuthService,
    AuthGuard,
    UserService,
    telomereService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
