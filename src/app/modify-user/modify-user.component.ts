import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Service/UserService';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Service/LoginService';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {
  Id:any;
  CurrentUser:any;
  ListSpecialisation:any;
  ListSecteur:String[]=[];
  ListType:String[]=[];
  registerForm1: FormGroup;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private UserService:UserService,
    private authenticationService: LoginService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.UserService.GetSpecialisation1().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          console.log(result);
          this.ListSpecialisation=result;console.log(this.ListSpecialisation),
          this.DisplayListType1(this.CurrentUser["specialisation"]["secteur"],result)
          })
        console.log('Sign in successfullllllllllllllllllllllllllllllllll!');
      }
    );
    this.registerForm1 = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required,Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phno: ['', Validators.required],
      secteurUser: ['', Validators.required],
      typeSecteurUser: ['', Validators.required],
  });

  

    this.Id = this.activatedRoute.snapshot.params.id;
    this.UserService.onGetUserById(this.Id).pipe(map((res => res))).subscribe(result => 
      {this.CurrentUser=result,
        console.log(this.CurrentUser),
        console.log("ffffffffffff               "+this.CurrentUser["specialisation"]["secteur"],
        this.registerForm1.controls.secteurUser.setValue(this.CurrentUser["specialisation"]["secteur"]),
        //document.getElementsByName("secteurUser")[0]["value"]=this.CurrentUser["specialisation"]["secteur"]
        this.registerForm1.controls.typeSecteurUser.setValue(this.CurrentUser["specialisation"]["type"]),
        this.registerForm1.controls.username.setValue(this.CurrentUser["username"]),
        this.registerForm1.controls.email.setValue(this.CurrentUser["email"]),
        this.registerForm1.controls.pwd.setValue(this.CurrentUser["password"]),
        this.registerForm1.controls.firstName.setValue(this.CurrentUser["firstName"]),
        this.registerForm1.controls.lastName.setValue(this.CurrentUser["lastName"]),
        this.registerForm1.controls.phno.setValue(this.CurrentUser["n_telephone"]),
        )});

  /*this.UserService.GetSpecialisation().pipe(map((res => res))).subscribe(result => {
    this.ListSpecialisation=result;console.log(this.ListSpecialisation),
    this.DisplayListType1(this.CurrentUser["specialisation"]["secteur"],result)
    })*/
    
    
  }
  get f() { return this.registerForm1.controls; }
  DisplayListSecteur(){
    if(this.ListSpecialisation!=null){
      for(let Secteur of this.ListSpecialisation){
        this.ListSecteur.push(Secteur.secteur)
      }
      this.ListSecteur=this.ListSecteur.filter((v,i,a)=>a.indexOf(v)==i);
    }
  }

  DisplayListType(){
    this.ListType=[]
    for(let type of this.ListSpecialisation){
      if(type.secteur==this.registerForm1.value.secteurUser){
        this.ListType.push(type.type)
      }
    }
    this.ListType=this.ListType.filter((v,i,a)=>a.indexOf(v)==i);
  }

  DisplayListType1(secteur,ListSpecialisation){
    this.ListType=[]
    for(let type of ListSpecialisation){
      if(type.secteur==secteur){
        this.ListType.push(type.type)
      }
    }
    this.ListType=this.ListType.filter((v,i,a)=>a.indexOf(v)==i);
  }

  ModifyInfoUser(InfoUser){
    this.submitted=true
    if(this.registerForm1.status=="VALID"){
      this.UserService.onModifyInfoUser(InfoUser,this.Id)
      this.router.navigate(["/listUses"])
    }
    console.log(this.registerForm1)
    console.log(InfoUser)
  }
/*a(){
  console.log(document.getElementsByName("secteurUser")[0]["value"])
  console.log(this.CurrentUser["specialisation"]["secteur"].toUpperCase())
  document.getElementsByName("secteurUser")[0]["value"]=this.CurrentUser["specialisation"]["secteur"].toUpperCase()
}*/

OnChangeEvent(){
  document.getElementsByName("typeSecteurUser")[0]["value"]=""
  this.registerForm1.controls.typeSecteurUser.setValue("")
}
  


}
