import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule } from '@angular/forms';
import { appareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AppareilComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule   
  ],
  providers: [
    appareilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
