import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
//import { LoginService } from 'src/app/Service/LoginService';

import { LoginService } from 'C:/Users/yassi/Desktop/Projet geoInfo/guru-able-angular-lite-v8.0/default/src/app/Service/LoginService';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss'],
  providers: []
})
export class BasicLoginComponent implements OnInit {
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private LoginService:LoginService,
    private http:HttpClient) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  handleLogin() {
    this.LoginService.authenticationService(this.username, this.password).subscribe((result)=> {
      console.log("1 " +this.username);console.log("2  "+ this.password)
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['IncidentTable']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

}
