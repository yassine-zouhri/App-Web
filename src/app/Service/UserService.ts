import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { LoginService } from './LoginService';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
    username: string=sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    password : string=sessionStorage.getItem("password");
    localhost:string="http://localhost:9876"
    constructor(private http: HttpClient,private authenticationService: LoginService) { }



    onGetUsers(){
        return this.http.get(this.localhost+"/listUsers",
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } })
        .pipe(map((res => res))).subscribe(result => {
          console.log(result);
          })
    }
    GetUsers(){
        return this.http.get(this.localhost+"/listUsers",
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } })
    }
    onAddUsers(User: Object){
        return this.http.post(this.localhost+"/AddUsers",User,
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } }).pipe(map((res => res))).subscribe(result => {
            console.log(result);
            })

    }
    
    GetSpecialisation1() {
        return new Promise(
          (resolve, reject) => {
            setTimeout(
              () => {
                resolve(this.http.get(this.localhost+"/listSpecialisation",
                { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } }));
              }, 1000
            );
          }
        );
      }

    GetSpecialisation(){
        return this.http.get(this.localhost+"/listSpecialisation",
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } })
    }

    OnDeleteUser(Id){
        return this.http.delete(this.localhost+"/deleteUsers/"+Id,
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } })
    }
    
    onGetUserById(Id){
        return this.http.get(this.localhost+"/listUsers/"+Id,
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } })
    }

    onModifyInfoUser(Info,Id){
        return this.http.put(this.localhost+"/UpdateUsers/"+Id,Info,
        { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } }).pipe(map((res => res))).subscribe(result => {
            console.log(result);
            })
    }

    GetRoleByEmail(email) {

            return new Promise(
              (resolve, reject) => {
                setTimeout(
                  () => {
                    resolve(this.http.get(this.localhost+"/GetUserByEmail?email="+email,
                    { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } }));
                  }, 200
                );
              }
            );
    }

    GetSecteurByEmail(email) {

      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              console.log(this.username+"       "+this.password)
              resolve(this.http.get(this.localhost+"/GetSecteurByEmail?email="+email,
              { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } }));
            }, 200
          );
        }
      );
}

    

}