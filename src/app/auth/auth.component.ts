import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Command } from 'selenium-webdriver';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
authStatus: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  this.router.navigate(['appareils']);
  }
onSignIn(){
  this.authService.signIn().then(
  ()=>{
    console.log('Sign in successful ! ');
  }
 );
}
onSignOut(){
  this.authService.signOut();
  this.authStatus = this.authService.isAuth;
  console.log('Sign out successful ! ');
}
}
