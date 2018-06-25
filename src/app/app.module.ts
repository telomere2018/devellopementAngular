import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule } from '@angular/forms';
import { appareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
const appRoutes: Routes = [
  { path: 'appareils', component: AppareilViewComponent},
  { path: 'appareils/:id', component: SingleAppareilComponent },
  { path: 'app', component: SingleAppareilComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [
    appareilService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
