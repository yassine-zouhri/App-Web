import { Component, OnInit, ViewChild } from '@angular/core';
import $ from "jquery";
import { map } from 'rxjs/operators';
import { UserService } from '../Service/UserService';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
//import { MustMatch } from './_helpers/must-match.validator';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;
  UserJson:any;
  isButtonVisible=false;
  ListSpecialisation:any;
  ListSecteur:String[]=[];
  ListType:String[]=[];

  constructor(private userService:UserService,private formBuilder: FormBuilder) { }
  
  
  
  

  ngOnInit() {
    /********************************* */
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required,Validators.minLength(6)]],
      cpwd: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phno: ['', Validators.required],
      photo: ['', Validators.required],
      typeUser: ['', Validators.required],
      secteurUser: ['', Validators.required],
      typeSecteurUser: ['', Validators.required],
  });
  /*************************************** */

    this.userService.GetSpecialisation().pipe(map((res => res))).subscribe(result => {
      this.ListSpecialisation=result
      console.log(this.ListSpecialisation)
      })

  /****************************************** */

    $(document).ready(function(){

      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;
      
      $(".next").click(function(){
      
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();
      
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      
      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now) {
      // for making fielset appear animation
      opacity = 1 - now;
      
      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      next_fs.css({'opacity': opacity});
      },
      duration: 600
      });
      });
      
      $(".previous").click(function(){
      
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
      
      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
      
      //show the previous fieldset
      previous_fs.show();
      
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now) {
      // for making fielset appear animation
      opacity = 1 - now;
      
      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      previous_fs.css({'opacity': opacity});
      },
      duration: 600
      });
      });
      
      $('.radio-group .radio').click(function(){
      $(this).parent().find('.radio').removeClass('selected');
      $(this).addClass('selected');
      });
      
      $(".submit").click(function(){
      return false;
      })
      
      });
      /******************************************* */
  }
  get f() { return this.registerForm.controls; }
  AddUser(User:any){
    User= this.registerForm.value
    
    this.UserJson={'username':User.username,'email':User.email,'pwd':User.pwd,'cpwd':User.pwd,
    'firstName':User.firstName,'lastName':User.lastName,'phno':User.phno,
    'photo':User.photo,'typeUser':User.typeUser,'secteurUser':User.secteurUser,'typeSecteurUser':User.typeSecteurUser}

    this.submitted = true;
    

    console.log(User)
    if (this.registerForm.valid) {
      this.isButtonVisible=true; 
      this.userService.onAddUsers(this.UserJson);
      console.log("trueeeeeeeeeee") }
    else
      {
        this.isButtonVisible=false; console.log("faldddddddde") };

  }
  

  VerifierSubmit(){
  
    if (this.registerForm.valid) {
        console.log("la formulaire est valide");
        this.isButtonVisible=true; 
        var current_fs, next_fs, previous_fs;var opacity;
        $(".next").click(function(){
        
          current_fs = $(this).parent();
          next_fs = $(this).parent().next();
          
          //Add Class Active
          $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
          
          //show the next fieldset
          next_fs.show();
          //hide the current fieldset with style
          current_fs.animate({opacity: 0}, {
          step: function(now) {
          // for making fielset appear animation
          opacity = 1 - now;
          
          current_fs.css({
          'display': 'none',
          'position': 'relative'
          });
          next_fs.css({'opacity': opacity});
          },
          duration: 600
          });
          });}
    else
      {console.log("la formulaire est non valide");
      this.isButtonVisible=false; };
  }
  
  DisplayListSecteur(){
    for(let Secteur of this.ListSpecialisation){
      this.ListSecteur.push(Secteur.secteur)
    }
    this.ListSecteur=this.ListSecteur.filter((v,i,a)=>a.indexOf(v)==i);
    this.VerificationTypeUser()
  }

  DisplayListType(){
    this.ListType=[]
    for(let type of this.ListSpecialisation){
      if(type.secteur==this.registerForm.value.secteurUser){
        this.ListType.push(type.type)
      }
    }
    this.ListType=this.ListType.filter((v,i,a)=>a.indexOf(v)==i);
    this.VerificationTypeUser()
  }

  VerificationTypeUser(){
    if(this.registerForm.value.typeUser=="ADMIN"){
      this.ListType=[]
      this.ListSecteur=[]
      this.registerForm.value.secteurUser="Rien"
      this.registerForm.value.typeSecteurUser="Rien"
      console.log(this.registerForm.value)
      console.log(this.registerForm.value.typeSecteurUser)
      if(this.registerForm.valid){
        console.log("its trueeeeeeeeeee")
      }
      else{
        console.log("its falseeeeeeee")
      }
      console.log(this.registerForm)
      this.registerForm.controls.secteurUser.setErrors({ valid: true })
      this.registerForm.controls.secteurUser.setValue(" ")
      this.registerForm.controls.typeSecteurUser.setValue(" ")
      console.log(this.registerForm.controls.secteurUser["status"])
      console.log("pppppppppppppppppppppp"+this.registerForm.valid)

      
    }
  }


  

}
