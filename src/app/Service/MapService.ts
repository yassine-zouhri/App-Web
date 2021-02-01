import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './LoginService';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  username: string=sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  password : string=sessionStorage.getItem("password");
  localhost:string="http://localhost:9876"
  localhostGeoServer:string="http://localhost:8080"
  constructor(private http: HttpClient,private authenticationService: LoginService) { }

  GetFichierJSON() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Regions&CQL_FILTER=(OBJECTID=7)&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }


  onGetIncident(){
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhost+"/listIncident",
            ));
          }, 2000
        );
      }
    );
    }
    onGetIncidentPhoto(){
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              resolve(this.http.get(this.localhost+"/onGetAllPhotoBy"));
            }, 2000
          );
        }
      );
      }
  RetournerNomsRegions() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Regions&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }

  RetournerNomsProvinces() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Province&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }

  RetournerNomsVille() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Villes&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }

  onValiderStatut(Id,statut,motif,secteur,type){
    return this.http.post(this.localhost+"/ValiderStatut?Id="+Id+"&statut="+statut+"&motif="+motif+"&secteur="+secteur+"&type="+type,[Id,statut,motif,secteur,type],
    { headers: { authorization: this.authenticationService.createBasicAuthToken(this.username, this.password) } }).pipe(map((res => res))).subscribe(result => {
        console.log(result);
        })

}


}
