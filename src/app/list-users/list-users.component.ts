import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/UserService';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModifyUserComponent } from '../modify-user/modify-user.component';
import { LoginService } from '../Service/LoginService';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  p:number=1
  page = 1;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  username: string=sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  password : string=sessionStorage.getItem("password");
  ListUsers:any;
  count:number
  constructor(private http: HttpClient,private UserService:UserService,
    private authenticationService: LoginService,private router: Router) { }

  ngOnInit() {
    setTimeout(
      () => {
        this.UserService.GetUsers().pipe(map((res => res))).subscribe(result => {
          console.log(result);this.ListUsers=result;this.count=this.ListUsers.length
          });
      }, 500
    );
    
    
    
    console.log("Session========"+sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME))
    console.log("Session========"+sessionStorage.getItem("password"))
  }

  handlePageChange(event) {
    this.page = event;
  }

  DeleteUser(Id){
    this.UserService.OnDeleteUser(Id).pipe(map((res => res))).subscribe(result => {});
    window.location.reload();
  }



}
