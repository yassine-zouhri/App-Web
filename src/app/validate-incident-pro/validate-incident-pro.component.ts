import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { icon, Marker} from 'leaflet';
import * as proj4leaflet from "proj4leaflet";
import 'proj4leaflet';
import { MapService } from '../Service/MapService';
import { UserService } from '../Service/UserService';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import 'leaflet/dist/leaflet.css';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-validate-incident-pro',
  templateUrl: './validate-incident-pro.component.html',
  styleUrls: ['./validate-incident-pro.component.scss']
})
export class ValidateIncidentProComponent implements OnInit {

  MesIncident:any=[]
  MesPhoto:any=[]
  Index:number=0
  MycurrentIncident:any;
  MyListIncidentWithPhto:any=[]
  longitude:any;
  latitude:any;
  p:number=1
  map:any;
 
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  username=null;ProSecteur=null;
  closeResult: string;
  constructor( private MapService:MapService,private router: Router,private modalService: NgbModal,private userService:UserService) { }

  ngOnInit() {
    
    this.getIncident()
    setTimeout(
      () => { 
        this.username=sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        this.userService.GetSecteurByEmail(this.username).then(
          (value) => {
            value["pipe"](map((res => res))).subscribe(result => {
              this.ProSecteur=result.secteur
              console.log(result.secteur);
              })
          }
        );
      }, 500
      );
    
  }

  AfficherMap(idvalue){
    if(this.map!=null){
      this.map.remove();
    }
    let longitude;
    let latitude;
    setTimeout(
      () => {
        console.log("length: "+this.MyListIncidentWithPhto.length)
        for(var i=0;i<this.MyListIncidentWithPhto.length;i++){
          if(this.MyListIncidentWithPhto[i]["IdReferenceModel"]==idvalue){
            longitude=this.MyListIncidentWithPhto[i]["longitude"]
            latitude=this.MyListIncidentWithPhto[i]["latitude"]
            console.log(longitude+"  fffff    "+latitude)
          }   
        }
        this.map = Leaflet.map("IdMap"+idvalue).setView([latitude,longitude], 10);
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'edupala.com © Angular LeafLet',
        }).addTo(this.map);
    
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          minZoom: 0,
          attribution: ''
        }).addTo(this.map);
        const iconUrl = 'assets/marker-icon.png';
        const iconDefault = icon({
          iconUrl,
        });
        Marker.prototype.options.icon = iconDefault;
        const markPoint = Leaflet.marker([latitude,longitude]).bindPopup("Secteur ");
        this.map.addLayer(markPoint); 
      }, 1000
    );
    
  }


  ngAfterViewInit() {
   
  }




  /*leafletMap() {
    console.log(this.MyListIncidentWithPhto)
    setTimeout(
      () => {
        for(var i=0;i<this.MyListIncidentWithPhto.length;i++){
          let IdMap=this.MyListIncidentWithPhto[i]["IdReferenceModel"]
          console.log(IdMap)
          let longitude=this.MyListIncidentWithPhto[i]["longitude"]
          let latitude=this.MyListIncidentWithPhto[i]["latitude"]
          let map:any;
          map = Leaflet.map(IdMap).setView([latitude,longitude], 10);
          Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'edupala.com © Angular LeafLet',}).addTo(map);
    
          Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 0,
            attribution: ''
          }).addTo(map);
          const iconUrl = 'assets/marker-icon.png';
          const iconDefault = icon({
            iconUrl,
          });
          Marker.prototype.options.icon = iconDefault;
          const markPoint = Leaflet.marker([latitude,longitude]).bindPopup("Secteur ");
          map.addLayer(markPoint);
          $("#"+IdMap).on('shown.bs.tab', function (e) {
            //call the clear map event first
            map.clearMap();
            //resize the map - this is the important part for you
           map.invalidateSize(true);
           //load the map once all layers cleared
           map.loadMap();
        })  
        }
        
      }, 500
    );
    
  }*/

  getIncident(){
    this.MapService.onGetIncident().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          result.forEach(element => {
            if((element['etat_validation']=="Validé" || element['etat_validation']=="pris en compte" 
            || element['etat_validation']=="en cours de traitement"|| element['etat_validation']=="Bloqué") && element['secteur']==this.ProSecteur){
              this.MesIncident.push(element)
            }
          });
          })
          
      }
    );
    setTimeout(
      () => {
        this.MapService.onGetIncidentPhoto().then(
          (value) => {
            value["pipe"](map((res => res))).subscribe(result => {
              result.forEach(element => {
                for(var i=0;i<this.MesIncident.length;i++){
                  if(this.MesIncident[i]['id']==element['id_Incident']){
                    this.MesPhoto.push(element);
                    this.longitude=this.MesIncident[i]['longitude']
                    this.latitude=this.MesIncident[i]['latitude']
                  }
                }   
              });

              }) 
          }
        );

      }, 500
    );
    
    setTimeout(
      () => {

        for(var i=0;i<this.MesIncident.length;i++){
          for(var j=0;j<this.MesPhoto.length;j++){
            if(this.MesIncident[i]['id']==this.MesPhoto[j].id_Incident){
              var date=this.MesIncident[i]['date'].split("+")[0].split("T")[0]+"  "+
                this.MesIncident[i]['date'].split("+")[0].split("T")[1].split(".")[0]
              var a={id:this.MesIncident[i]['id'],province:this.MesIncident[i]['province'],secteur:this.MesIncident[i]['secteur'],
                  type:this.MesIncident[i]['type'],photo:'data:image/jpeg;base64,'+this.MesPhoto[j].data,date1:date,
                description:this.MesIncident[i]['description'],longitude:this.MesIncident[i]['longitude'],
                latitude:this.MesIncident[i]['latitude'],IdReferenceModel:"Model"+this.MesIncident[i]['id'],Statut:this.MesIncident[i]['etat_validation']}
              this.MyListIncidentWithPhto.push(a)
            }
          }
        }
        if(this.MyListIncidentWithPhto.length>0){this.MycurrentIncident=this.MyListIncidentWithPhto[0]}
        console.log(this.MyListIncidentWithPhto)
        
      }, 3000
    );

  }



 

  ValiderStatut(Id,Classvalue){
    console.log(Id+"        "+Classvalue)
    let a=document.getElementsByClassName("ClassMap"+Classvalue)
    let statut=a[0]['value']
    console.log(statut)
    var motif=null
    this.MapService.onValiderStatut(Id,statut,motif,null,null)
    window.location.reload()
  }

  //element['etat_validation']!=null && element['etat_validation']!="Validé" &&  element['etat_validation']!="Rejeté"
}
